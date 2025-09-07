import React, { useState } from 'react';
import { AppView } from './types';
import Header from './components/Header';
import Home from './components/Home';
import ReportGenerator from './components/ReportGenerator';
import PartnerDirectory from './components/PartnerDirectory';
import Donations from './components/Donations';
import { TranslationProvider, useTranslations } from './hooks/useTranslations';
import ShareReport from './components/ShareReport';

const AppContent: React.FC = () => {
    const [view, setView] = useState<AppView>('home');
    const [generatedReport, setGeneratedReport] = useState<string>('');
    const [originalText, setOriginalText] = useState<string>('');
    const { language } = useTranslations();

    const handleReportGenerated = (report: string, original: string) => {
        setGeneratedReport(report);
        setOriginalText(original);
        setView('share-report');
    };

    const renderContent = () => {
        switch (view) {
            case 'home':
                return <Home setView={setView} />;
            case 'report-generator':
                return <ReportGenerator onReportGenerated={handleReportGenerated} setView={setView} />;
            case 'share-report':
                return <ShareReport report={generatedReport} originalText={originalText} setView={setView} />;
            case 'partner-directory':
                return <PartnerDirectory setView={setView} />;
            case 'donations':
                return <Donations setView={setView} />;
            default:
                return <Home setView={setView} />;
        }
    };

    return (
        <div className={`min-h-screen bg-gray-50 ${language === 'ur' ? 'font-urdu' : 'font-sans'}`}>
            <Header setView={setView} />
            <main className="container mx-auto px-4 py-8">
                {renderContent()}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <TranslationProvider>
            <AppContent />
        </TranslationProvider>
    );
};


export default App;