import { School } from '@/types';
import { create } from 'zustand';

export type OptionalSchool = School | Omit<School, 'id'>;

export interface ResumeEducationDefaultValues {
	title: string;
	isHidden: boolean;
	educationList: OptionalSchool[];
}

export interface ResumeEducationStore {
	resumeEducation: ResumeEducationDefaultValues;
	updateEducation: (education: ResumeEducationDefaultValues) => void;
}

export const DEFAULT_EDUCATION_VALUES: ResumeEducationDefaultValues = {
	title: 'Education',
	isHidden: false,
	educationList: [],
};

export const useResumeEducationStore = create<ResumeEducationStore>((set) => ({
	resumeEducation: DEFAULT_EDUCATION_VALUES,
	updateEducation: (input: ResumeEducationDefaultValues) => set((state) => ({ ...state, resumeEducation: { ...input } })),
}));
