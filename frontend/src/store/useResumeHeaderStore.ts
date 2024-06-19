import { Header } from '@/types';
import { create } from 'zustand';

export type ResumeHeaderDefaultValues = Omit<Header, 'id'>;

export interface ResumeHeaderStore {
	resumeHeader: ResumeHeaderDefaultValues;
	updateHeader: (header: ResumeHeaderDefaultValues) => void;
}

export const DEFAULT_HEADER_VALUES: ResumeHeaderDefaultValues = {
	name: 'Your name',
	job: 'Your current job',
	location: 'Your location',
	email: 'you@email.com',
	phone: 'xxx-xxx-xxx',
	links: [],
};

export const useResumeHeaderStore = create<ResumeHeaderStore>((set) => ({
	resumeHeader: DEFAULT_HEADER_VALUES,
	updateHeader: (input: ResumeHeaderDefaultValues) => set((state) => ({ ...state, resumeHeader: { ...input } })),
}));
