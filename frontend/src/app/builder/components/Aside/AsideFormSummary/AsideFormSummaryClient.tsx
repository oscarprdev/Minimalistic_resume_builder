'use client';

import { useResumeSummaryStore } from '@/store/useResumeSummaryStore';
import { z } from 'zod';
import AsideFormSummary, { asideFormSummarySchema } from './AsideFormSummary';
import { right } from '@/lib/either';

const AsideFormSummaryClient = () => {
	const summaryStore = useResumeSummaryStore();

	const handleClientSubmit = async (values: z.infer<typeof asideFormSummarySchema>) => {
		summaryStore.updateSummary({ title: values.title, summary: values.summary });

		return right('');
	};

	return <AsideFormSummary handleSubmit={handleClientSubmit} />;
};

export default AsideFormSummaryClient;
