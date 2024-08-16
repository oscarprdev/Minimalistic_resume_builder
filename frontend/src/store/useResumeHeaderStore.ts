import { defaultResume } from '@/data/default-resume';
import { Header } from '@/types';
import { create } from 'zustand';

export type ResumeHeaderDefaultValues = Omit<Header, 'id'>;

export interface ResumeHeaderStore {
	resumeHeader: ResumeHeaderDefaultValues;
	updateHeader: (header: ResumeHeaderDefaultValues) => void;
}

export const useResumeHeaderStore = create<ResumeHeaderStore>(set => ({
	resumeHeader: defaultResume.header,
	updateHeader: (input: ResumeHeaderDefaultValues) => set(state => ({ ...state, resumeHeader: { ...input } })),
}));
