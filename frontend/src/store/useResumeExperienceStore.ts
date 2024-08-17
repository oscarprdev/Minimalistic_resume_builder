import { defaultResume } from '@/data/default-resume';
import { Experience } from '@/types';
import { create } from 'zustand';

export type ResumeExperienceDefaultValues = Omit<Experience, 'id'>;

export interface ResumeExperienceStore {
	resumeExperience: ResumeExperienceDefaultValues;
	updateExperience: (experience: ResumeExperienceDefaultValues) => void;
}

export const useResumeExperienceStore = create<ResumeExperienceStore>(set => ({
	resumeExperience: defaultResume.experience,
	updateExperience: (input: ResumeExperienceDefaultValues) =>
		set(state => ({ ...state, resumeExperience: { ...input } })),
}));
