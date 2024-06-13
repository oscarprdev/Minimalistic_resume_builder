import { Summary } from '@/types';
import { create } from 'zustand';

export type ResumeSummaryDefaultValues = Omit<Summary, 'id'>;

export interface ResumeSummaryStore {
	resumeSummary: ResumeSummaryDefaultValues;
	updateSummary: (summary: ResumeSummaryDefaultValues) => void;
}

export const DEFAULT_SUMMARY_VALUES: ResumeSummaryDefaultValues = {
	title: 'About me',
	summary: 'Your professional summary',
};

export const useResumeSummaryStore = create<ResumeSummaryStore>((set) => ({
	resumeSummary: DEFAULT_SUMMARY_VALUES,
	updateSummary: (input: ResumeSummaryDefaultValues) => set((state) => ({ ...state, resumeSummary: { ...input } })),
}));
