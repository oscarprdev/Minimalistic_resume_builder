'use client';

import { DEFAULT_INFO_VALUES, useResumeInfoStore } from '@/store/useResumeInfoStore';
import AsideFormInfo, { asideFormInfoSchema } from './AsideFormInfo';
import { z } from 'zod';
import { right } from '@/lib/either';

const AsideFormInfoClient = () => {
	const infoStore = useResumeInfoStore();

	const handleClientSubmit = async (values: z.infer<typeof asideFormInfoSchema>) => {
		infoStore.updateInfo({ title: values.title });

		return right('');
	};

	return (
		<AsideFormInfo
			defaultValues={DEFAULT_INFO_VALUES}
			handleSubmit={handleClientSubmit}
		/>
	);
};

export default AsideFormInfoClient;
