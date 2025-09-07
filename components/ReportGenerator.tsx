import React, { useState, useRef, useEffect } from 'react';
import { generateEnhancedReport } from '../services/geminiService';
import { transcribeAudio } from '../services/transcriptionService';
import { generateVoice } from '../services/voiceService';
import { useTranslations } from '../hooks/useTranslations';
import { MicrophoneIcon, StopIcon, PlayIcon, TrashIcon, SpeakerWaveIcon, ArrowLeftIcon, CloseIcon } from './icons';
import { AppView } from '../types';

type RecordingState = 'idle' | 'recording' | 'recorded' | 'transcribing' | 'transcribed' | 'generatingVoice' | 'voiceGenerated' | 'generatingReport';

const languageOptions = [
    { code: 'ur-PK', name: 'Urdu (اردو)' },
    { code: 'en-US', name: 'English' },
    { code: 'hi-IN', name: 'Hindi (हिंदी)' },
    { code: 'es-MX', name: 'Spanish (Español)' },
];

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ onReportGenerated, setView }) => {
    const { t, language } = useTranslations();
    const [recordingState, setRecordingState] = useState<RecordingState>('idle');
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [transcribedText, setTranscribedText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('ur-PK');
    const [aiVoiceUrl, setAiVoiceUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioPlayerRef = useRef<HTMLAudioElement>(null);
    const processCancelledRef = useRef(false);

    // Effect to auto-trigger transcription
    useEffect(() => {
        if (recordingState === 'recorded' && audioBlob && !isProcessing) {
            handleTranscribe();
        }
    }, [recordingState, audioBlob]);
    
    // Effect to auto-trigger AI voice generation
    useEffect(() => {
        if (recordingState === 'transcribed' && transcribedText && !isProcessing) {
             handleGenerateVoice();
        }
    }, [recordingState, transcribedText]);

    // Effect to auto-trigger final report generation
    useEffect(() => {
        if (recordingState === 'voiceGenerated' && aiVoiceUrl && !isProcessing) {
            handleFinalReport();
        }
    }, [recordingState, aiVoiceUrl]);


    useEffect(() => {
        return () => {
            if (audioUrl) URL.revokeObjectURL(audioUrl);
            if (aiVoiceUrl && aiVoiceUrl.startsWith('blob:')) URL.revokeObjectURL(aiVoiceUrl);
        };
    }, [audioUrl, aiVoiceUrl]);

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = event => audioChunksRef.current.push(event.data);
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
                setRecordingState('recorded');
            };
            mediaRecorderRef.current.start();
            setRecordingState('recording');
            setError(null);
        } catch (err) {
            console.error("Microphone access denied:", err);
            setError(t('micAccessDenied'));
        }
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current?.stop();
    };

    const handleReset = () => {
        setRecordingState('idle');
        setAudioBlob(null);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
        setTranscribedText('');
        setAiVoiceUrl(null);
        setError(null);
        setIsProcessing(false);
        processCancelledRef.current = false;
    };

    const handleCancel = () => {
        processCancelledRef.current = true;
        setIsProcessing(false);
        if (recordingState === 'transcribing') setRecordingState('recorded');
        if (recordingState === 'generatingVoice') setRecordingState('transcribed');
        if (recordingState === 'generatingReport') setRecordingState('voiceGenerated');
    }

    const handleTranscribe = async () => {
        if (!audioBlob) return;
        setRecordingState('transcribing');
        setIsProcessing(true);
        processCancelledRef.current = false;
        setError(null);
        try {
            const text = await transcribeAudio(audioBlob, selectedLanguage);
            if(processCancelledRef.current) return;
            setTranscribedText(text);
            setRecordingState('transcribed');
        } catch (err) {
            if(processCancelledRef.current) return;
            setError(t('transcriptionError'));
            setRecordingState('recorded');
        } finally {
             if(!processCancelledRef.current) setIsProcessing(false);
        }
    };

    const handleGenerateVoice = async () => {
        if (!transcribedText) return;
        setRecordingState('generatingVoice');
        setIsProcessing(true);
        processCancelledRef.current = false;
        setError(null);
        try {
            const voiceUrl = await generateVoice(transcribedText);
            if(processCancelledRef.current) return;
            setAiVoiceUrl(voiceUrl);
            setRecordingState('voiceGenerated');
        } catch (err) {
            if(processCancelledRef.current) return;
            setError(t('voiceGenerationError'));
            setRecordingState('transcribed');
        } finally {
             if(!processCancelledRef.current) setIsProcessing(false);
        }
    };
    
    const handleFinalReport = async () => {
        if (!transcribedText) return;
        setRecordingState('generatingReport');
        setIsProcessing(true);
        processCancelledRef.current = false;
        setError(null);
        try {
            const report = await generateEnhancedReport(transcribedText);
            if(processCancelledRef.current) return;
            onReportGenerated(report, transcribedText);
        } catch (err) {
            if(processCancelledRef.current) return;
            setError(t('reportGenerationError'));
            setRecordingState('voiceGenerated');
        } finally {
            if(!processCancelledRef.current) setIsProcessing(false);
        }
    };

    const renderStep = (stepNumber: number, titleKey: string, content: React.ReactNode, isActive: boolean) => {
        const title = t(titleKey);
        const urduTitle = language === 'ur' ? `مرحلہ ${stepNumber}: ` : `Step ${stepNumber}: `;
        return (
            <div className={`w-full p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-500 ${isActive ? 'bg-white border-2 border-violet-500' : 'bg-gray-100 border-2 border-transparent opacity-60'}`}>
                <h3 className="text-2xl lg:text-3xl font-bold text-violet-800 mb-4 text-center">
                    <span className="font-sans">{urduTitle}</span>{title}
                </h3>
                <div className="mt-6">{content}</div>
            </div>
        )
    }
    
    const renderLoader = (messageKey: string) => (
         <div className="text-center">
            <div className="flex justify-center items-center">
                 <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-2xl text-violet-600 font-semibold">{t(messageKey)}</p>
            </div>
            <button onClick={handleCancel} className="mt-6 bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 flex items-center mx-auto text-lg">
                <CloseIcon size={5} className="mr-2" /> {t('cancel')}
            </button>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
             <button onClick={() => setView('home')} className="flex items-center text-violet-600 hover:text-violet-800 font-semibold text-xl">
                <ArrowLeftIcon size={7} className={`mr-2 ${language === 'ur' ? 'rotate-180' : ''}`} />
                {t('backToHome')}
            </button>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-violet-800 mb-2 text-center">{t('reportGeneratorTitle')}</h2>
            <p className="text-gray-600 mb-8 text-center text-xl lg:text-2xl">{t('reportGeneratorDescriptionVoice')}</p>

            {error && <p className="text-red-500 text-center text-xl font-semibold bg-red-100 p-4 rounded-lg">{error}</p>}

            {/* Step 1: Record Voice */}
            {renderStep(1, 'step1Title', (
                <div className="text-center">
                     {recordingState === 'idle' && (
                        <button onClick={handleStartRecording} className="bg-violet-600 text-white font-bold py-5 px-10 rounded-full shadow-lg hover:bg-violet-700 transition-all duration-300 flex items-center mx-auto text-2xl">
                            <MicrophoneIcon size={10} className="mr-4" />
                            {t('startRecording')}
                        </button>
                    )}
                    {recordingState === 'recording' && (
                         <button onClick={handleStopRecording} className="bg-red-600 text-white font-bold py-5 px-10 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 flex items-center mx-auto text-2xl animate-pulse">
                            <StopIcon size={10} className="mr-4" />
                            {t('stopRecording')}
                        </button>
                    )}
                     {(recordingState !== 'idle' && recordingState !== 'recording') && (
                        <p className="text-2xl text-green-600 font-semibold">{t('recordingComplete')}</p>
                     )}
                </div>
            ), recordingState === 'idle' || recordingState === 'recording')}
            
            {/* Step 2: Select Language & Review Recording */}
            {(recordingState === 'recorded' || recordingState === 'transcribing') && renderStep(2, 'step2Title', (
                 <>
                    {recordingState === 'transcribing' ? renderLoader('transcribingInProgress') : (
                        <div className="space-y-6 text-center">
                            <p className="text-xl text-gray-700">{t('reviewRecording')}</p>
                            <div className="flex justify-center items-center gap-4">
                                <audio ref={audioPlayerRef} src={audioUrl || ''} />
                                <button onClick={() => audioPlayerRef.current?.play()} className="bg-green-500 text-white p-5 rounded-full shadow-md hover:bg-green-600"><PlayIcon size={8} /></button>
                                <button onClick={handleReset} className="bg-gray-500 text-white p-5 rounded-full shadow-md hover:bg-gray-600"><TrashIcon size={8} /></button>
                            </div>
                            <div>
                                <label htmlFor="language-select" className="block text-center font-semibold text-gray-700 mb-2 text-xl">{t('selectLanguageInstruction')}</label>
                                <select
                                    id="language-select"
                                    value={selectedLanguage}
                                    onChange={e => setSelectedLanguage(e.target.value)}
                                    className="w-full max-w-sm mx-auto p-4 border border-gray-300 rounded-lg text-xl"
                                >
                                    {languageOptions.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
                                </select>
                            </div>
                        </div>
                    )}
                 </>
            ), recordingState === 'recorded' || recordingState === 'transcribing')}

            {/* Step 3: Review Transcription */}
            {(recordingState === 'transcribed' || recordingState === 'generatingVoice') && renderStep(3, 'step3Title', (
                 <>
                    {recordingState === 'generatingVoice' ? renderLoader('generatingVoiceInProgress') : (
                        <div>
                            <p className="text-xl text-gray-700 text-center mb-4">{t('reviewTranscriptionInstruction')}</p>
                            <textarea
                                value={transcribedText}
                                onChange={e => setTranscribedText(e.target.value)}
                                className="w-full h-48 p-4 border border-gray-300 rounded-lg text-lg"
                            />
                        </div>
                    )}
                </>
            ), recordingState === 'transcribed' || recordingState === 'generatingVoice')}

            {/* Step 4: Preview AI Voice */}
            {(recordingState === 'voiceGenerated' || recordingState === 'generatingReport') && renderStep(4, 'step4Title', (
                <>
                    {recordingState === 'generatingReport' ? renderLoader('generatingReportInProgress') : (
                        <div className="text-center">
                            <p className="text-xl text-gray-700 mb-4">{t('previewAIVoiceInstruction')}</p>
                            <audio src={aiVoiceUrl || ''} controls className="w-full max-w-md mx-auto" />
                        </div>
                    )}
                </>
            ), recordingState === 'voiceGenerated' || recordingState === 'generatingReport')}

        </div>
    );
};

export default ReportGenerator;

interface ReportGeneratorProps {
    onReportGenerated: (report: string, originalText: string) => void;
    setView: (view: AppView) => void;
}