import React, { useState } from 'react';
import { AppView } from '../types';
import { ArrowLeftIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

interface ShareReportProps {
    report: string;
    originalText: string;
    setView: (view: AppView) => void;
}

const ShareReport: React.FC<ShareReportProps> = ({ report, originalText, setView }) => {
    const [copied, setCopied] = useState(false);
    const { t, language } = useTranslations();

    const handleCopy = () => {
        navigator.clipboard.writeText(report);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg animate-fade-in">
            <button onClick={() => setView('home')} className="flex items-center text-violet-600 hover:text-violet-800 mb-6 font-semibold text-lg">
                <ArrowLeftIcon size={6} className={`mr-2 ${language === 'ur' ? 'rotate-180' : ''}`} />
                {t('backToHome')}
            </button>
            
            <h2 className="text-4xl font-bold text-violet-800 mb-4">Your Generated Report</h2>
            <p className="text-gray-600 mb-6 text-xl">This structured report can be shared with legal or support services. You can copy it, print it, or download it as a PDF.</p>

            <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 max-h-96 overflow-y-auto mb-6">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 text-lg">{report}</pre>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={handleCopy}
                    className="bg-violet-600 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:bg-violet-700 transition-colors duration-300 text-xl"
                >
                    {copied ? 'Copied to Clipboard!' : 'Copy Report Text'}
                </button>
                <button
                    onClick={() => window.print()}
                    className="bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300 text-xl"
                >
                    Print / Save as PDF
                </button>
            </div>
            
            <div className="mt-12">
                <h3 className="text-2xl font-bold text-violet-800 mb-2">Next Steps</h3>
                <p className="text-gray-600 mb-4 text-lg">Consider sharing this report with a trusted support organization.</p>
                <button
                    onClick={() => setView('partner-directory')}
                    className="text-violet-600 font-bold hover:underline text-lg"
                >
                    Find a Support Partner →
                </button>
            </div>

        </div>
    );
};

export default ShareReport;