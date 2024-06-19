'use client';

import { useResumeHeaderStore } from '@/store/useResumeHeaderStore';
import { z } from 'zod';
import AsideFormHeader, { asideFormHeaderSchema } from './AsideFormHeader';
import { left, right } from '@/lib/either';
import { useCallback } from 'react';

const AsideFormHeaderClient = () => {
	const headerStore = useResumeHeaderStore();

	const handleClientSubmit = async (values: z.infer<typeof asideFormHeaderSchema>) => {
		headerStore.updateHeader({ ...values });

		return right('');
	};

	const removeImage = useCallback(async () => {
		headerStore.updateHeader({ ...headerStore.resumeHeader, image: undefined });
		return right('');
	}, []);

	const updateImage = useCallback(async (formData: FormData) => {
		const file = formData.get('image') as File;
		if (!file) {
			return left('File not valid');
		}
		const imageUrl = URL.createObjectURL(file);

		headerStore.updateHeader({ ...headerStore.resumeHeader, image: imageUrl });
		return right(imageUrl);
	}, []);

	return (
		<AsideFormHeader
			handleSubmit={handleClientSubmit}
			updateImage={updateImage}
			removeImage={removeImage}
		/>
	);
};

export default AsideFormHeaderClient;
