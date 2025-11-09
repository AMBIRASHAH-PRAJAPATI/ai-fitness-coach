import { GoogleGenAI, Modality } from '@google/genai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not found");
}

const geminiImageModel = "gemini-2.5-flash-image";

export const generateImage = async (prompt: string): Promise<string> => {
    const augmentedPrompt = `Generate a realistic, high-quality, well-lit image for a fitness app. The image should be focused on the subject. Subject: ${prompt}`;
    try {
        const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await genAI.models.generateContent({
          model: geminiImageModel,
          contents: {
            parts: [{ text: augmentedPrompt }],
          },
          config: {
            responseModalities: [Modality.IMAGE],
          },
        });
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData?.data) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:image/png;base64,${base64ImageBytes}`;
          }
        }
        console.error("No image data found in response parts");
        throw new Error("No image was generated.");
    } catch (e) {
        console.error("Error while generating image:", e);
        throw new Error("'Sorry, something went wrong while generating image. Please try again.");
    }
};