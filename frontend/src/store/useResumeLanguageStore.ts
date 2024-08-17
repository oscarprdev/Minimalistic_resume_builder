import { defaultResume } from '@/data/default-resume';
import { Languages } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ResumeLanguageDefaultValues = Omit<Languages, 'id'>;

export interface ResumeLanguageStore {
	resumeLanguage: ResumeLanguageDefaultValues;
	updateLanguage: (language: ResumeLanguageDefaultValues) => void;
}

export const useResumeLanguageStore = create<ResumeLanguageStore>()(
	persist(
		set => ({
			resumeLanguage: defaultResume.languages,
			updateLanguage: (input: ResumeLanguageDefaultValues) =>
				set(state => ({ ...state, resumeLanguage: { ...input } })),
		}),
		{
			name: 'resume-language-storage',
		}
	)
);
