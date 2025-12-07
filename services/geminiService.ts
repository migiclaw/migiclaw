import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Generates a character portrait based on description.
 * Uses gemini-2.5-flash-image (Nano Banana) for speed.
 */
export const generateCharacterPortrait = async (
  name: string,
  description: string
): Promise<string | null> => {
  try {
    const ai = getClient();
    // Optimized prompt for Sci-Fi character portraits
    const prompt = `Close-up character portrait of ${name} from The Three-Body Problem. ${description}. Sci-fi art style, realistic, cinematic lighting, detailed face, dark space background with stars. High resolution.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      // nano banana does not support complex imageConfig, relying on defaults
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

/**
 * Explains the relationship between two characters in Chinese and English.
 * Uses gemini-2.5-flash
 */
export const getRelationshipDetails = async (
  char1: string,
  char2: string
): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `Briefly explain the relationship between ${char1} and ${char2} in "The Three-Body Problem". Provide the answer in both Chinese and English. Limit to 100 words total.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Relationship data unavailable / 暂无关系数据";
  } catch (error) {
    console.error("Error fetching relationship:", error);
    return "Could not retrieve relationship data at this time. / 无法获取数据。";
  }
};