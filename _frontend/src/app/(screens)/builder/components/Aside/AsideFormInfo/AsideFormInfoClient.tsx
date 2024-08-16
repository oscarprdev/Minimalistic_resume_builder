'use client';

import { useResumeInfoStore } from '@/store/useResumeInfoStore';
import { right } from '@/lib/either';
import { FormInfoValues } from './schema-validations';
import AsideFormInfo from './AsideFormInfo';

const AsideFormInfoClient = () => {
	const infoStore = useResumeInfoStore();

	const handleClientSubmit = async (values: FormInfoValues) => {
		infoStore.updateInfo({ title: values.title });

		return right('');
	};

	return <AsideFormInfo handleSubmit={handleClientSubmit} />;
};

export default AsideFormInfoClient;
