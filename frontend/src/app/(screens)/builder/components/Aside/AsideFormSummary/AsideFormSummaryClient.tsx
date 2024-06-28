'use client';

import { useResumeSummaryStore } from '@/store/useResumeSummaryStore';
import AsideFormSummary from './AsideFormSummary';
import { right } from '@/lib/either';
import { FormSummaryValues } from './schema-validations';

const AsideFormSummaryClient = () => {
	const summaryStore = useResumeSummaryStore();

	const handleClientSubmit = async (values: FormSummaryValues) => {
		summaryStore.updateSummary({ title: values.title, summary: values.summary });

		return right('');
	};

	return <AsideFormSummary handleSubmit={handleClientSubmit} />;
};

export default AsideFormSummaryClient;
