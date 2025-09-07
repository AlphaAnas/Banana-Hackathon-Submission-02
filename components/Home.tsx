import React from 'react';
import { AppView } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { ArrowLeftIcon } from './icons'; // Re-using for right-arrow

const Home: React.FC<HomeProps> = ({ setView }) => {
    const { t, language } = useTranslations();

    const handleEmergencyAlert = () => {
        alert(t('emergencyAlertMessage'));
    };

    return (
        <div className="text-center animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-violet-800 mb-4">{t('homeTitle')}</h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-12">{t('homeDescription')}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                {/* File a Detailed Report Button */}
                <div 
                    onClick={() => setView('report-generator')}
                    className="bg-violet-600 text-white p-8 rounded-lg shadow-lg cursor-pointer hover:bg-violet-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center"
                >
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2">{t('fileReport')}</h2>
                    <p className="text-violet-100 text-base lg:text-lg">{t('fileReportDescHome')}</p>
                </div>

                {/* Emergency Alert Button */}
                <div 
                    onClick={handleEmergencyAlert}
                    className="bg-red-600 text-white p-8 rounded-lg shadow-lg cursor-pointer hover:bg-red-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center"
                >
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2">{t('emergencyAlert')}</h2>
                    <p className="text-red-100 text-base lg:text-lg">{t('emergencyAlertDesc')}</p>
                </div>
            </div>

            <div className="mt-16 border-t pt-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div 
                        onClick={() => setView('partner-directory')}
                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:border-violet-300 border transition-all duration-300 text-left"
                    >
                        <h3 className="text-xl font-bold text-violet-700 mb-2">{t('findSupport')}</h3>
                        <p className="text-gray-600 flex justify-between items-center">
                            {t('findSupportDesc')}
                            <ArrowLeftIcon size={6} className={`text-violet-500 ${language === 'ur' ? '' : 'rotate-180'}`} />
                        </p>
                    </div>
                     <div 
                        onClick={() => setView('donations')}
                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:border-violet-300 border transition-all duration-300 text-left"
                    >
                        <h3 className="text-xl font-bold text-violet-700 mb-2">{t('supportOurCause')}</h3>
                        <p className="text-gray-600 flex justify-between items-center">
                           {t('supportOurCauseDesc')}
                           <ArrowLeftIcon size={6} className={`text-violet-500 ${language === 'ur' ? '' : 'rotate-180'}`} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

interface HomeProps {
    setView: (view: AppView) => void;
}