import { create } from 'zustand';

export interface ResumeInfoDefaultValues {
	title: string;
}

export interface ResumeInfoStore {
	resumeInfo: ResumeInfoDefaultValues;
	updateInfo: (info: ResumeInfoDefaultValues) => void;
}

export const DEFAULT_INFO_VALUES: ResumeInfoDefaultValues = {
	title: 'Your resume title',
};

export const useResumeInfoStore = create<ResumeInfoStore>((set) => ({
	resumeInfo: DEFAULT_INFO_VALUES,
	updateInfo: (input: ResumeInfoDefaultValues) => set((state) => ({ ...state, resumeInfo: { ...input } })),
}));
