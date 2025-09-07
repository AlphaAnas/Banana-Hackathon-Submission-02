// This service is now structured to call a backend API endpoint for text-to-speech generation.
// This is the recommended, secure approach as it keeps your ElevenLabs API key off the client-side.

/**
 * Sends text to the backend to be converted into speech using the ElevenLabs API.
 * @param text The text to convert to speech.
 * @returns A promise that resolves to a local Blob URL for the generated audio.
 */
export const generateVoice = async (text: string): Promise<string> => {
    console.log(`Requesting AI voice generation for text: "${text.substring(0, 50)}..."`);
    
    try {
        // In a real application, you would create this '/api/generate-voice' endpoint on your backend.
        // This endpoint would receive the text, call the ElevenLabs API with your secret API key,
        // and stream the resulting audio (e.g., MP3) back to the client.
        const response = await fetch('/api/generate-voice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.error || `Server responded with status: ${response.status}`;
            throw new Error(errorMessage);
        }

        // The response from the backend should be the audio file itself.
        const audioBlob = await response.blob();

        if (audioBlob.size === 0) {
            throw new Error("Received empty audio file from server.");
        }

        // Create a local URL for the audio blob to be used in the <audio> element.
        const audioUrl = URL.createObjectURL(audioBlob);
        return audioUrl;

    } catch (error) {
        console.error("Error during AI voice generation:", error);

        // --- MOCK RESPONSE FOR OFFLINE/DEV ---
        // If the API call fails (e.g., the backend is not set up yet), we fall back to a silent audio clip.
        // This allows the UI to continue working during development.
        // You should REMOVE this fallback in a production environment.
        console.warn("API call failed. Falling back to mock voice data.");
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        const silentWavDataURL = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
        return silentWavDataURL;
        // --- END OF MOCK RESPONSE ---

        // In production, you would re-throw the error to be handled by the UI.
        // throw error;
    }
};