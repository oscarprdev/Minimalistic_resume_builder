import { defaultResume } from '@/data/default-resume';
import { Header } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ResumeHeaderDefaultValues = Omit<Header, 'id'>;

export interface ResumeHeaderStore {
	resumeHeader: ResumeHeaderDefaultValues;
	updateHeader: (header: ResumeHeaderDefaultValues) => void;
}

export const useResumeHeaderStore = create<ResumeHeaderStore>()(
	persist(
		set => ({
			resumeHeader: defaultResume.header,
			updateHeader: (input: ResumeHeaderDefaultValues) =>
				set(state => ({ ...state, resumeHeader: { ...input } })),
		}),
		{
			name: 'resume-header-storage',
		}
	)
);
