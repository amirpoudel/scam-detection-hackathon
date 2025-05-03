import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";


class JsonOutputParser extends StringOutputParser {
  async parse(text: string): Promise<any> {
    try {
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      return JSON.parse(jsonString);
    } catch (err) {
      throw new Error("Failed to parse JSON from model output.");
    }
  }
}


const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4",
  temperature: 0.2,
});


const urlAnalysisTemplate = PromptTemplate.fromTemplate(`
You are a security expert analyzing URLs for phishing attempts.
Analyze the following URL and return a JSON object with these fields:

- phishingLikelihood: "High" | "Medium" | "Low"
- confidenceScore: number (0-100)
- suspiciousIndicators: string[] (list of red flags)
- explanation: string (explain the reasoning)
- safetyRecommendation: string (what user should do)
- isSafe: boolean (true if safe, false if suspicious)

Only return valid JSON and nothing else.

URL: {url}
`);


const textAnalysisTemplate = PromptTemplate.fromTemplate(`
You are a security expert analyzing messages for phishing attempts.
Analyze the following message and return a JSON object with these fields:

- phishingLikelihood: "High" | "Medium" | "Low"
- confidenceScore: number (0-100)
- suspiciousIndicators: string[] (list of red flags)
- explanation: string (explain the reasoning)
- safetyRecommendation: string (what user should do)
- isSafe: boolean (true if safe, false if suspicious)

Only return valid JSON and nothing else.

Message: {text}
`);


function isURL(input: string): boolean {
  try {
    const parsedUrl = new URL(input);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

function extractDomainInfo(urlString: string) {
  try {
    const parsedUrl = new URL(urlString);
    return {
      protocol: parsedUrl.protocol,
      hostname: parsedUrl.hostname,
      pathname: parsedUrl.pathname,
      searchParams: parsedUrl.searchParams,
    };
  } catch (err) {
    return null;
  }
}


export async function analyzePhishingContent(input: string): Promise<any> {
  const isUrlInput = isURL(input);
  const outputParser = new JsonOutputParser();

  if (isUrlInput) {
    const domainInfo = extractDomainInfo(input);
    if (!domainInfo) {
      return {
        error: "Invalid URL format. Unable to analyze.",
      };
    }

    const urlChain = RunnableSequence.from([
      urlAnalysisTemplate,
      chatModel,
      outputParser,
    ]);

    return await urlChain.invoke({ url: input });
  } else {
    const textChain = RunnableSequence.from([
      textAnalysisTemplate,
      chatModel,
      outputParser,
    ]);

    return await textChain.invoke({ text: input });
  }
}

