import { defaultResume } from '@/data/default-resume';
import { Languages } from '@/types';
import { create } from 'zustand';

export type ResumeLanguageDefaultValues = Omit<Languages, 'id'>;

export interface ResumeLanguageStore {
	resumeLanguage: ResumeLanguageDefaultValues;
	updateLanguage: (language: ResumeLanguageDefaultValues) => void;
}

export const useResumeLanguageStore = create<ResumeLanguageStore>(set => ({
	resumeLanguage: defaultResume.languages,
	updateLanguage: (input: ResumeLanguageDefaultValues) => set(state => ({ ...state, resumeLanguage: { ...input } })),
}));
