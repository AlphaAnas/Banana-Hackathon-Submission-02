import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../lib/translations';
import { Language } from '../types';

interface TranslationContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    // FIX: The original code used JSX syntax (<TranslationContext.Provider>) in a .ts file,
    // which causes a parsing error. Rewriting this with React.createElement avoids the
    // syntax issue while achieving the same result. This fixes all related compilation errors.
    return React.createElement(TranslationContext.Provider, { value: { language, setLanguage, t } }, children);
};

export const useTranslations = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslations must be used within a TranslationProvider');
    }
    return context;
};