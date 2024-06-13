'use client';

import { DEFAULT_SUMMARY_VALUES, useResumeSummaryStore } from '@/store/useResumeSummaryStore';
import { z } from 'zod';
import AsideFormSummary, { asideFormSummarySchema } from './AsideFormSummary';
import { right } from '@/lib/either';

const AsideFormSummaryClient = () => {
	const summaryStore = useResumeSummaryStore();

	const handleClientSubmit = async (values: z.infer<typeof asideFormSummarySchema>) => {
		summaryStore.updateSummary({ title: values.title, summary: values.summary });

		return right('');
	};

	return (
		<AsideFormSummary
			defaultValues={DEFAULT_SUMMARY_VALUES}
			handleSubmit={handleClientSubmit}
		/>
	);
};

export default AsideFormSummaryClient;
