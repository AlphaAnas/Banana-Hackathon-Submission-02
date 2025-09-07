import React from 'react';
import { AppView } from '../types';
import { ArrowLeftIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

interface DonationsProps {
    setView: (view: AppView) => void;
}

const Donations: React.FC<DonationsProps> = ({ setView }) => {
    const { t, language } = useTranslations();
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
             <button onClick={() => setView('home')} className="flex items-center text-violet-600 hover:text-violet-800 mb-6 font-semibold text-lg">
                <ArrowLeftIcon size={6} className={`mr-2 ${language === 'ur' ? 'rotate-180' : ''}`} />
                {t('backToHome')}
            </button>
            <h2 className="text-3xl font-bold text-violet-800 mb-4">Support Our Mission</h2>
            <p className="text-gray-600 mb-8">
                Your generous donation helps us maintain this platform, reach more women in need, and partner with on-ground support services. Every contribution, no matter how small, makes a significant impact.
            </p>

            <div className="bg-violet-50 border-l-4 border-violet-500 p-6 rounded-r-lg text-left">
                <h3 className="font-bold text-violet-900">How to Donate</h3>
                <p className="text-violet-800 mt-2">
                    In a real application, this section would contain secure payment options, such as a bank transfer details, a credit card form, or links to payment gateways.
                </p>
                <p className="text-violet-800 mt-2">
                    <strong>Thank you for considering a donation to Aurat Ki Awaz.</strong>
                </p>
            </div>

             <button 
                onClick={() => setView('home')} 
                className="mt-8 bg-violet-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-violet-700 transition-colors duration-300"
            >
                {t('backToHome')}
            </button>
        </div>
    );
};

export default Donations;