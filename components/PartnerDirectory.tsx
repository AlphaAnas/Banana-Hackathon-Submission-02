import React from 'react';
import { partners } from '../constants';
import { useTranslations } from '../hooks/useTranslations';
import { AppView } from '../types';
import { ArrowLeftIcon } from './icons';

interface PartnerDirectoryProps {
    setView: (view: AppView) => void;
}

const PartnerDirectory: React.FC<PartnerDirectoryProps> = ({ setView }) => {
    const { t, language } = useTranslations();

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
             <button onClick={() => setView('home')} className="flex items-center text-violet-600 hover:text-violet-800 mb-6 font-semibold text-lg">
                <ArrowLeftIcon size={6} className={`mr-2 ${language === 'ur' ? 'rotate-180' : ''}`} />
                {t('backToHome')}
            </button>
            <h2 className="text-3xl font-bold text-violet-800 mb-4 text-center">{t('partnerDirectoryTitle')}</h2>
            <p className="text-gray-600 mb-8 text-center">{t('partnerDirectoryDescription')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map(partner => (
                    <div key={partner.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-violet-700">{partner.name}</h3>
                        <p className="text-sm font-semibold text-gray-500 mb-2">{partner.city}</p>
                        <p className="text-gray-700 mb-4">{partner.expertise}</p>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-violet-600 bg-violet-200">
                            {partner.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnerDirectory;