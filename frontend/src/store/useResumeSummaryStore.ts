import { Summary } from '@/types';
import { create } from 'zustand';

export type ResumeSummaryDefaultValues = Omit<Summary, 'id'>;

export interface ResumeSummaryStore {
	summary: ResumeSummaryDefaultValues;
	updateSummary: (summary: ResumeSummaryDefaultValues) => void;
}

export const DEFAULT_SUMMARY_VALUES: ResumeSummaryDefaultValues = {
	title: '',
	summary: '',
};

export const useResumeSummaryStore = create<ResumeSummaryStore>((set) => ({
	summary: DEFAULT_SUMMARY_VALUES,
	updateSummary: (input: ResumeSummaryDefaultValues) => set((state) => ({ ...state, resumeSummary: { ...input } })),
}));
