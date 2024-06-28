import { Job } from '@/types';
import { create } from 'zustand';

export type OptionalJob = Job | Omit<Job, 'id'>;

export interface ResumeExperienceDefaultValues {
	title: string;
	isHidden: boolean;
	jobList: OptionalJob[];
}

export interface ResumeExperienceStore {
	resumeExperience: ResumeExperienceDefaultValues;
	updateExperience: (experience: ResumeExperienceDefaultValues) => void;
}

export const DEFAULT_EXPERIENCE_VALUES: ResumeExperienceDefaultValues = {
	title: 'Professional Experience',
	isHidden: false,
	jobList: [],
};

export const useResumeExperienceStore = create<ResumeExperienceStore>((set) => ({
	resumeExperience: DEFAULT_EXPERIENCE_VALUES,
	updateExperience: (input: ResumeExperienceDefaultValues) => set((state) => ({ ...state, resumeExperience: { ...input } })),
}));
