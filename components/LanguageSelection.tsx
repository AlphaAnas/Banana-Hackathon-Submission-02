
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Language } from '../types';

const LanguageSelection: React.FC = () => {
    const { language, setLanguage } = useTranslations();

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    language === 'en' ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                EN
            </button>
            <button
                onClick={() => handleLanguageChange('ur')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    language === 'ur' ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                UR
            </button>
        </div>
    );
};

export default LanguageSelection;
