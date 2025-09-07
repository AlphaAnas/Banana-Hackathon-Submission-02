export interface LegalGuidance {
    id: string;
    title: string;
    description: string;
    language: string;
}

export interface Partner {
    id: string;
    name: string;
    type: string;
    city: string;
    expertise: string;
}

export type AppView =
    | 'home'
    | 'report-generator'
    | 'report-generating'
    | 'share-report'
    | 'partner-directory'
    | 'donations';

export type Language = 'en' | 'ur';