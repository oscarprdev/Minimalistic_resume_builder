import { defaultResume } from '@/data/default-resume';
import { Education } from '@/types';
import { create } from 'zustand';

export type ResumeEducationDefaultValues = Omit<Education, 'id'>;

export interface ResumeEducationStore {
	resumeEducation: ResumeEducationDefaultValues;
	updateEducation: (education: ResumeEducationDefaultValues) => void;
}

export const useResumeEducationStore = create<ResumeEducationStore>(set => ({
	resumeEducation: defaultResume.education,
	updateEducation: (input: ResumeEducationDefaultValues) =>
		set(state => ({ ...state, resumeEducation: { ...input } })),
}));
