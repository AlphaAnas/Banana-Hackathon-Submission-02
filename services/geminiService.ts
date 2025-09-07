
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateEnhancedReport = async (userInput: string): Promise<string> => {
    if (!API_KEY) {
        // Return a mock response if API key is not available
        return new Promise(resolve => setTimeout(() => {
            resolve(`This is a detailed, AI-enhanced report based on the user's account: "${userInput}". The AI has structured the information clearly and empathetically to be suitable for legal or support services. It highlights key events, emotional impact, and any mentioned needs or threats, ensuring the user's voice is heard accurately and powerfully.`);
        }, 1500));
    }

    try {
        const prompt = `
            You are a compassionate and supportive assistant for 'Aurat Ki Awaz', an organization helping women facing domestic violence in Pakistan. A user has provided the following account of an incident. Your task is to expand this into a clear, detailed, and empathetic report. 
            Follow these instructions carefully:
            1.  Maintain a supportive and non-judgmental tone throughout the report.
            2.  Do NOT add any information, events, or feelings that were not explicitly mentioned by the user.
            3.  Elaborate on the provided details to make them clearer for legal or support organizations. Structure the user's statements into coherent paragraphs.
            4.  Start the report with a summary sentence like: "This report details an account of [type of abuse, e.g., domestic violence, harassment] as described by the individual."
            5.  Organize the report into logical sections if possible (e.g., "Incident Description", "Emotional Impact").
            6.  Ensure the language is formal but easy to understand.
            7.  Do NOT offer advice, opinions, or legal conclusions. Your sole purpose is to document the user's statement accurately and empathetically.

            Here is the user's account:
            ---
            ${userInput}
            ---
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating enhanced report:", error);
        return "We are sorry, but we were unable to generate the report at this time. Please try again later. Your original text has been saved.";
    }
};
