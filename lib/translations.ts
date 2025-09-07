import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
    en: {
        // Header
        headerTitle: "Aurat Ki Awaz",
        headerSubtitle: "Empowering Women Through Technology",

        // General
        backToHome: "Back to Home",
        cancel: "Cancel",

        // Home
        homeTitle: "Your Voice, Your Strength",
        homeDescription: "A safe space to document your experiences, find support, and access legal guidance. We are here to listen.",
        fileReport: "File a Detailed Report",
        fileReportDescHome: "Anonymously record your story in your own language.",
        emergencyAlert: "Emergency Alert",
        emergencyAlertDesc: "Send an immediate, anonymous alert to support services.",
        emergencyAlertMessage: "This is a placeholder for the emergency alert system. In a real application, this would discreetly notify pre-defined support organizations with a request for urgent help.",
        findSupport: "Find Support Near You",
        findSupportDesc: "Connect with verified NGOs and support services.",
        supportOurCause: "Support Our Cause",
        supportOurCauseDesc: "Your contribution makes a difference.",
        
        // Report Generator
        reportGeneratorTitle: "Create a Confidential Report",
        reportGeneratorDescriptionVoice: "Follow the steps below. The process is automated to make it easier for you.",
        micAccessDenied: "Microphone access was denied. Please enable it in your browser settings to record your voice.",
        startRecording: "Start Recording",
        stopRecording: "Stop Recording",
        recordingComplete: "Recording Complete!",
        reviewRecording: "Please listen to your recording and choose your language.",
        selectLanguageInstruction: "Choose the language you spoke in:",
        transcribeVoice: "Create Text from Voice", // Kept for reference, but button is removed
        transcribingInProgress: "Creating text...",
        transcriptionError: "Could not create text from the recording. Please try again.",
        reviewTranscriptionInstruction: "Please review and edit the text if needed.",
        generateAIVoice: "Create AI Voice", // Kept for reference, but button is removed
        generatingVoiceInProgress: "Generating secure AI voice...",
        voiceGenerationError: "Could not generate the AI voice. Please try again.",
        previewAIVoiceInstruction: "Listen to the secure AI voice narration of your report.",
        generateFinalReport: "Generate Final Report", // Kept for reference, but button is removed
        generatingReportInProgress: "Generating your final report...",
        reportGenerationError: "Could not generate the final report. Please try again.",

        // Steps
        step1Title: "Record Your Voice",
        step2Title: "Select Language",
        step3Title: "Review Text",
        step4Title: "Preview AI Voice",

        // Partner Directory
        partnerDirectoryTitle: "Partner Directory",
        partnerDirectoryDescription: "Find trusted organizations that can provide support, legal aid, and shelter.",
    },
    ur: {
        // Header
        headerTitle: "عورت کی آواز",
        headerSubtitle: "ٹیکنالوجی کے ذریعے خواتین کو بااختیار بنانا",

        // General
        backToHome: "مرکزی صفحہ پر واپس",
        cancel: "منسوخ کریں",

        // Home
        homeTitle: "آپ کی آواز، آپ کی طاقت",
        homeDescription: "اپنے تجربات کو دستاویز کرنے، مدد تلاش کرنے، اور قانونی رہنمائی تک رسائی حاصل کرنے کے لیے ایک محفوظ جگہ۔ ہم یہاں سننے کے لیے موجود ہیں۔",
        fileReport: "تفصیلی رپورٹ درج کریں",
        fileReportDescHome: "خفیہ طور پر اپنی کہانی اپنی زبان میں ریکارڈ کریں۔",
        emergencyAlert: "ہنگامی الرٹ",
        emergencyAlertDesc: "امدادی خدمات کو فوری، گمنام الرٹ بھیجیں۔",
        emergencyAlertMessage: "یہ ایمرجنسی الرٹ سسٹم کے لیے ایک پلیس ہولڈر ہے۔ حقیقی ایپلیکیشن میں، یہ پہلے سے طے شدہ امدادی تنظیموں کو فوری مدد کی درخواست کے ساتھ محتاط طور پر مطلع کرے گا۔",
        findSupport: "اپنے قریب مدد تلاش کریں",
        findSupportDesc: "تصدیق شدہ این جی اوز اور امدادی خدمات سے رابطہ کریں۔",
        supportOurCause: "ہمارے مقصد کی حمایت کریں",
        supportOurCauseDesc: "آپ کا تعاون تبدیلی لا سکتا ہے۔",

        // Report Generator
        reportGeneratorTitle: "خفیہ رپورٹ بنائیں",
        reportGeneratorDescriptionVoice: "نیچے دیے گئے اقدامات پر عمل کریں۔ آپ کی آسانی کے لیے یہ عمل خودکار ہے۔",
        micAccessDenied: "مائیکروفون تک رسائی سے انکار کر دیا گیا۔ براہ کرم اپنی آواز ریکارڈ کرنے کے لیے اسے اپنے براؤزر کی ترتیبات میں فعال کریں۔",
        startRecording: "ریکارڈنگ شروع کریں",
        stopRecording: "ریکارڈنگ بند کریں",
        recordingComplete: "ریکارڈنگ مکمل!",
        reviewRecording: "براہ کرم اپنی ریکارڈنگ سنیں اور اپنی زبان منتخب کریں۔",
        selectLanguageInstruction: "وہ زبان منتخب کریں جس میں آپ نے بات کی:",
        transcribeVoice: "آواز سے متن بنائیں",
        transcribingInProgress: "متن بنایا جا رہا ہے۔۔۔",
        transcriptionError: "ریکارڈنگ سے متن نہیں بن سکا۔ براہ کرم دوبارہ کوشش کریں۔",
        reviewTranscriptionInstruction: "براہ کرم متن کا جائزہ لیں اور اگر ضروری ہو تو ترمیم کریں۔",
        generateAIVoice: "AI آواز بنائیں",
        generatingVoiceInProgress: "محفوظ AI آواز تیار کی جا رہی ہے۔۔۔",
        voiceGenerationError: "AI آواز پیدا نہیں ہو سکی۔ براہ کرم دوبارہ کوشش کریں۔",
        previewAIVoiceInstruction: "اپنی رپورٹ کی محفوظ AI آواز سنیں۔",
        generateFinalReport: "حتمی رپورٹ بنائیں",
        generatingReportInProgress: "آپ کی حتمی رپورٹ تیار کی جا رہی ہے۔۔۔",
        reportGenerationError: "حتمی رپورٹ تیار نہیں ہو سکی۔ براہ کرم دوبارہ کوشش کریں۔",
        
        // Steps
        step1Title: "اپنی آواز ریکارڈ کریں",
        step2Title: "زبان منتخب کریں",
        step3Title: "متن کا جائزہ لیں",
        step4Title: "AI آواز کا جائزہ لیں",

        // Partner Directory
        partnerDirectoryTitle: "شراکت دار ڈائرکٹری",
        partnerDirectoryDescription: "ایسی قابل اعتماد تنظیمیں تلاش کریں جو مدد، قانونی امداد اور پناہ گاہ فراہم کر سکیں۔",
    }
};