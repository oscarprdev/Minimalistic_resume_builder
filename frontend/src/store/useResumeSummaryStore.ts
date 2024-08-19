import { defaultResume } from '@/data/default-resume';
import { Summary } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ResumeSummaryDefaultValues = Omit<Summary, 'id'>;

export interface ResumeSummaryStore {
	resumeSummary: ResumeSummaryDefaultValues;
	updateSummary: (summary: ResumeSummaryDefaultValues) => void;
}

export const useResumeSummaryStore = create<ResumeSummaryStore>()(
	persist(
		set => ({
			resumeSummary: defaultResume.summary,
			updateSummary: (input: ResumeSummaryDefaultValues) =>
				set(state => ({ ...state, resumeSummary: { ...input } })),
		}),
		{
			name: 'resume-summary-storage',
		}
	)
);
