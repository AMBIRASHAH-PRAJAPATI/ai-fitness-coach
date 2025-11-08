import { GoogleGenAI, Type } from '@google/genai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not found");
}

const geminiModel = "gemini-2.5-flash";

export const getMotivationQuote = async (): Promise<string> => {
    const prompt = `Provide one powerful fitness motivation quote, and return a simple valid string, Do NOT include any text, markdown, or comments`; 
    try {
        const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await genAI.models.generateContent({
            model: geminiModel,
            contents: prompt,
        });
        return response.text?.trim() ?? "Push yourself, because no one else is going to do it for you.";
    } catch (error) {
        console.error("Error while fetching motivation quote:", error);
        return "The only bad workout is the one that didn't happen.";
    }
};
