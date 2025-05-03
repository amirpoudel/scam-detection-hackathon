// textPhishingDetector.ts
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";


const phishingAnalysisSchema = z.object({
  phishingLikelihood: z.enum(["High", "Medium", "Low"]),
  confidenceScore: z.number().min(0).max(100),
  suspiciousIndicators: z.array(z.string()),
  explanation: z.string(),
  safetyRecommendation: z.string(),
  isSafe: z.boolean(),
});

type PhishingAnalysisResult = z.infer<typeof phishingAnalysisSchema>;


const outputParser = StructuredOutputParser.fromZodSchema(
  phishingAnalysisSchema
);


export class TextPhishingDetector {
  private model: ChatOpenAI;
  private textAnalysisChain: RunnableSequence;

  constructor(
    apiKey: string,
    modelName: string = "gpt-4",
    temperature: number = 0.2
  ) {
    
    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: modelName,
      temperature: temperature,
    });
    const formatInstructions = outputParser
      .getFormatInstructions()
      .replace(/{/g, "{{")
      .replace(/}/g, "}}");

    const templateStr = `
You are a specialized security agent tasked with detecting phishing attempts in text messages.

Analyze the following message carefully and determine if it appears to be a phishing attempt.
Consider these factors:
- Urgency or pressure tactics ("act now", "limited time", "immediate action required")
- Requesting sensitive information (passwords, credit card details, personal info)
- Poor grammar or spelling typical of phishing attempts
- Suspicious links mentioned (even if not active links)
- Impersonation of known entities (banks, services, people)
- Offers that seem too good to be true
- Threats or negative consequences for inaction
- Unusual requests or instructions
- Mismatched sender information
- Suspicious attachments mentioned

MESSAGE TO ANALYZE:
{text}

${formatInstructions}
`;

    const textAnalysisTemplate = PromptTemplate.fromTemplate(templateStr);

    
    this.textAnalysisChain = RunnableSequence.from([
      textAnalysisTemplate,
      this.model,
      outputParser,
    ]);
  }


  async analyzeMessage(text: string): Promise<PhishingAnalysisResult> {
    try {
      // Preprocess the text (trim whitespace, normalize)
      const processedText = text.trim();

      if (!processedText) {
        throw new Error("Empty message provided for analysis");
      }

      // Run the text analysis chain
      const result = await this.textAnalysisChain.invoke({
        text: processedText,
      });
      return result;
    } catch (error) {
      console.error("Error analyzing text message:", error);
      throw error;
    }
  }

  async quickCheck(
    text: string
  ): Promise<{ isSafe: boolean; risk: string; reason: string }> {
    try {
      const analysis = await this.analyzeMessage(text);

      return {
        isSafe: analysis.isSafe,
        risk: analysis.phishingLikelihood,
        reason:
          analysis.suspiciousIndicators.length > 0
            ? `Found ${
                analysis.suspiciousIndicators.length
              } suspicious indicators: ${analysis.suspiciousIndicators[0]}${
                analysis.suspiciousIndicators.length > 1 ? " and others" : ""
              }`
            : "No suspicious indicators found",
      };
    } catch (error) {
      console.error("Error in quick check:", error);
      throw error;
    }
  }
}
