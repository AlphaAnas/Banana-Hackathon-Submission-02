
import React from 'react';
import { AppView } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSelection from './LanguageSelection';

interface HeaderProps {
    setView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
    const { t } = useTranslations();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div 
                    className="cursor-pointer"
                    onClick={() => setView('home')}
                >
                    <h1 className="text-2xl font-bold text-violet-800">{t('headerTitle')}</h1>
                    <p className="text-sm text-gray-500">{t('headerSubtitle')}</p>
                </div>
                <LanguageSelection />
            </div>
        </header>
    );
};

export default Header;
