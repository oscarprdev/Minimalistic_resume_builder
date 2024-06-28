import { Language } from '@/types';
import { create } from 'zustand';

export type OptionalLanguage = Language | Omit<Language, 'id'>;

export interface ResumeLanguagesDefaultValues {
	title: string;
	isHidden: boolean;
	languageList: OptionalLanguage[];
}

export interface ResumeLanguagesStore {
	resumeLanguages: ResumeLanguagesDefaultValues;
	updateLanguages: (languages: ResumeLanguagesDefaultValues) => void;
}

export const DEFAULT_LANGUAGES_VALUES: ResumeLanguagesDefaultValues = {
	title: 'Languages',
	isHidden: false,
	languageList: [],
};

export const useResumeLanguagesStore = create<ResumeLanguagesStore>((set) => ({
	resumeLanguages: DEFAULT_LANGUAGES_VALUES,
	updateLanguages: (input: ResumeLanguagesDefaultValues) => set((state) => ({ ...state, resumeLanguages: { ...input } })),
}));
