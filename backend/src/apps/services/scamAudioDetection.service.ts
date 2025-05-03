// audioPhishingDetector.ts
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import OpenAI from "openai";
import { TextPhishingDetector } from "./scamTextDetection.service";
import * as path from "path";


const audioAnalysisSchema = z.object({
  phishingLikelihood: z.enum(["High", "Medium", "Low"]),
  confidenceScore: z.number().min(0).max(100),
  suspiciousIndicators: z.array(z.string()),
  voiceCharacteristics: z.object({
    possibleSynthetic: z.boolean(),
    emotionalTone: z.string(),
    pressureTactics: z.boolean(),
  }),
  transcriptAnalysis: z.object({
    containsSuspiciousContent: z.boolean(),
    suspiciousElements: z.array(z.string()),
  }),
  explanation: z.string(),
  safetyRecommendation: z.string(),
  isSafe: z.boolean()
});

type AudioAnalysisResult = z.infer<typeof audioAnalysisSchema>;

export class AudioPhishingDetector {
  private model: ChatOpenAI;
  private openai: OpenAI;
  private textDetector: TextPhishingDetector;
  private audioAnalysisChain: RunnableSequence;
  private tempDir: string;
  
  
  constructor(
    apiKey: string,
    modelName: string = "gpt-4",
    temperature: number = 0.2,
    tempDir: string = "./temp"
  ) {
   
    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: modelName,
      temperature: temperature,
    });
    
    this.openai = new OpenAI({
      apiKey: apiKey
    });
    
   
    this.textDetector = new TextPhishingDetector(apiKey, modelName, temperature);
    
  
    this.tempDir = tempDir;
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
    
    
    const outputParser = StructuredOutputParser.fromZodSchema(audioAnalysisSchema);
    const stringOutputParser = new StringOutputParser();
    
    const formatInstructions = outputParser.getFormatInstructions();

    const audioAnalysisTemplate = PromptTemplate.fromTemplate(`
You are a specialized security agent tasked with detecting phishing attempts in audio messages.

Analyze the following audio transcript and voice characteristics carefully to determine if it appears to be a phishing attempt.

TRANSCRIPT: {transcript}

VOICE CHARACTERISTICS:
{voiceCharacteristics}

PRELIMINARY TEXT ANALYSIS:
{textAnalysis}

Consider these factors:
- Signs of synthetic or AI-generated voice
- Emotional manipulation or pressure in the voice tone
- Urgency in delivery
- Inconsistencies between voice characteristics and claimed identity
- Content indicators similar to text phishing (requests for sensitive info, urgency, threats, etc.)
- Voice deepfake possibilities

${formatInstructions.replace(/{/g, '{{').replace(/}/g, '}}')}
`);

   
    this.audioAnalysisChain = RunnableSequence.from([
      audioAnalysisTemplate,
      this.model,
      outputParser
    ]);
  }
  
 
  async transcribeAudio(audioFilePath: string): Promise<string> {
    try {
      const transcript = await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(audioFilePath),
        model: "whisper-1",
        language: "en",
      });
      
      return transcript.text;
    } catch (error) {
      console.error("Error transcribing audio:", error);
      throw error;
    }
  }
  
  
  async analyzeVoiceCharacteristics(audioFilePath: string): Promise<string> {
    
    const prompt = `
      Analyze the audio file I transcribed for you. Focus on voice characteristics that might 
      indicate a phishing or scam attempt:
      
      1. Does the voice sound synthetic or AI-generated?
      2. What emotional tone is used (urgent, threatening, overly friendly)?
      3. Are pressure tactics evident in the voice tone or pacing?
      4. Are there any unusual speech patterns or inconsistencies?
      5. Rate the naturalness of speech (pauses, fillers, etc.)
      
      Provide a detailed analysis of these voice characteristics.
    `;
    
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert in voice analysis and security." },
        { role: "user", content: prompt }
      ],
    });
    
    return completion.choices[0]?.message?.content ?? "Voice analysis unavailable.";
  }

  async analyzeAudio(audioFilePath: string): Promise<AudioAnalysisResult> {
    try {
      if (!fs.existsSync(audioFilePath)) {
        throw new Error(`Audio file not found: ${audioFilePath}`);
      }
      
      // Step 1: Transcribe audio to text (this has to be done first)
      console.log("Transcribing audio...");
      const transcript = await this.transcribeAudio(audioFilePath);
      
      // Steps 2 & 3: Run text analysis and voice analysis in parallel
      console.log("Analyzing transcript content and voice characteristics in parallel...");
      const [textAnalysis, voiceCharacteristics] = await Promise.all([
        this.textDetector.analyzeMessage(transcript),
        this.analyzeVoiceCharacteristics(audioFilePath)
      ]);
      
      // Step 4: Combine analyses for final assessment
      console.log("Generating final assessment...");
      const result = await this.audioAnalysisChain.invoke({
        transcript,
        voiceCharacteristics,
        textAnalysis: JSON.stringify(textAnalysis, null, 2)
      });
      
      return result;
    } catch (error) {
      console.error("Error analyzing audio:", error);
      throw error;
    }
  }
  
 
//  async analyzeAudio(audioFilePath: string): Promise<AudioAnalysisResult> {
//     try {
//       if (!fs.existsSync(audioFilePath)) {
//         throw new Error(`Audio file not found: ${audioFilePath}`);
//       }
      
    
//       console.log("Transcribing audio...");
//       const transcript = await this.transcribeAudio(audioFilePath);
      
//       console.log("Analyzing transcript content...");
//       const textAnalysis = await this.textDetector.analyzeMessage(transcript);
      
//       console.log("Analyzing voice characteristics...");
//       const voiceCharacteristics = await this.analyzeVoiceCharacteristics(audioFilePath);
      
//       console.log("Generating final assessment...");
//       const result = await this.audioAnalysisChain.invoke({
//         transcript,
//         voiceCharacteristics,
//         textAnalysis: JSON.stringify(textAnalysis, null, 2)
//       });
      
//       return result;
//     } catch (error) {
//       console.error("Error analyzing audio:", error);
//       throw error;
//     }
//   }
  
  /**
   * Analyze audio data buffer for phishing attempts
   * @param audioBuffer - Audio data buffer
   * @param fileExtension - Audio file extension (default: mp3)
   * @returns Analysis result object
   */
  async analyzeAudioBuffer(audioBuffer: Buffer, fileExtension: string = "mp3"): Promise<AudioAnalysisResult> {
    const tempFilePath = path.join(this.tempDir, `${uuidv4()}.${fileExtension}`);
    
    try {
      // Write buffer to temporary file
      fs.writeFileSync(tempFilePath, audioBuffer);
      
      // Analyze the temporary file
      const result = await this.analyzeAudio(tempFilePath);
      
      // Clean up
      fs.unlinkSync(tempFilePath);
      
      return result;
    } catch (error) {
      // Clean up on error
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      
      console.error("Error analyzing audio buffer:", error);
      throw error;
    }
  }
  
  /**
   * Quick analysis of audio file returning simplified results
   * @param audioFilePath - Path to audio file
   * @returns Simplified analysis result
   */
  async quickCheck(audioFilePath: string): Promise<{isSafe: boolean, risk: string, reason: string}> {
    try {
      // Just transcribe and use text analysis for quick check
      const transcript = await this.transcribeAudio(audioFilePath);
      
      // Use text detector for quick assessment
      const quickResult = await this.textDetector.quickCheck(transcript);
      
      return {
        isSafe: quickResult.isSafe,
        risk: quickResult.risk,
        reason: `Based on transcript: ${quickResult.reason}. Note: full audio analysis would be more accurate.`
      };
    } catch (error) {
      console.error("Error in quick audio check:", error);
      throw error;
    }
  }
}