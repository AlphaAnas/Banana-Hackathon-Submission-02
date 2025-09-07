// This service is now structured to call a backend API endpoint for transcription.
// This is the recommended, secure approach as it keeps your API keys (e.g., for Google Cloud Speech-to-Text) off the client-side.

/**
 * Sends an audio blob to the backend for transcription.
 * @param audioBlob The audio data to transcribe.
 * @param languageCode The BCP-47 language code (e.g., 'en-US', 'ur-PK').
 * @returns A promise that resolves to the transcribed text.
 */
export const transcribeAudio = async (audioBlob: Blob, languageCode: string): Promise<string> => {
    console.log(`Sending audio for transcription. Language: ${languageCode}, Blob size: ${audioBlob.size}`);

    // We use FormData to send the audio file and language code to the backend.
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('languageCode', languageCode);

    try {
        // In a real application, you would create this '/api/transcribe' endpoint on your backend.
        // This endpoint would receive the audio file, call the Google Speech-to-Text API with your secret key,
        // and return the transcribed text.
        const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            // Try to get a more specific error message from the backend response body
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.error || `Server responded with status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();

        if (!data.transcription) {
            throw new Error("Invalid response from transcription server.");
        }

        return data.transcription;

    } catch (error) {
        console.error("Error during transcription:", error);

        // --- MOCK RESPONSE FOR OFFLINE/DEV ---
        // If the API call fails (e.g., the backend is not set up yet), we fall back to the mock data.
        // This allows the UI to continue working during development.
        // You should REMOVE this fallback in a production environment.
        console.warn("API call failed. Falling back to mock transcription data.");
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        return getMockTranscription(languageCode);
        // --- END OF MOCK RESPONSE ---

        // In production, you would re-throw the error to be handled by the UI.
        // throw error;
    }
};

/**
 * Provides a mock transcription based on language. Used as a fallback.
 */
const getMockTranscription = (languageCode: string): string => {
     switch (languageCode) {
        case 'ur-PK':
            return "یہ آپ کی آڈیو ریکارڈنگ سے نقل شدہ متن کا ایک نمونہ ہے۔ ایک حقیقی ایپلیکیشن میں، سسٹم آپ کی آواز کو یہاں متن میں تبدیل کر دے گا۔ برائے مہربانی حتمی رپورٹ بنانے سے پہلے اس کا جائزہ لیں اور اگر ضروری ہو تو ترمیم کریں۔";
        case 'hi-IN':
            return "यह आपकी ऑडियो रिकॉर्डिंग से ट्रांसक्राइब्ड टेक्स्ट का एक प्लेसहोल्डर है। एक वास्तविक एप्लिकेशन में, सिस्टम आपकी आवाज़ को यहाँ टेक्स्ट में बदल देगा। कृपया अंतिम रिपोर्ट बनाने से पहले समीक्षा करें और यदि आवश्यक हो तो संपादित करें।";
        case 'es-MX':
            return "Este es un marcador de posición para el texto transcrito de su grabación de audio. En una aplicación real, el sistema convertiría su voz en texto aquí. Por favor, revíselo y edítelo si es necesario antes de generar el informe final.";
        case 'en-US':
        default:
            return "This is a placeholder for the transcribed text from your audio recording. In a real application, the system would convert your voice into text here. Please review and edit if necessary before generating the final report.";
    }
}