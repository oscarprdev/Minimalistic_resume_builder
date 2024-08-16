'use server';

import { DELETE_IMAGE_INPUT_KEYWORD } from '../shared/types';
import { BUCKET_ACCES_KEY, BUCKET_KEY_ID, BUCKET_URL } from '@/constants';
import { Either, errorResponse, successResponse } from '@/lib/types';
import { Bucket } from '@oprdev/cloudflare-r2-storage';

export const deleteImageAction = async (
	keyword: DELETE_IMAGE_INPUT_KEYWORD,
	resumeId: string
): Promise<Either<string, string>> => {
	try {
		const bucket = new Bucket({
			endpoint: BUCKET_URL,
			accessKeyId: BUCKET_KEY_ID,
			secretAccessKey: BUCKET_ACCES_KEY,
			bucketName: 'resume',
		});

		const images = await bucket.getKeysByEntity({ entity: resumeId });
		if (Array.isArray(images) && images.length > 0) {
			const filteredImages = images.filter(img => img.includes(keyword));

			if (filteredImages.length > 0) {
				await Promise.all([filteredImages.map(img => bucket.deleteItemByKey({ key: img }))]);
			}
		}

		return successResponse('');
	} catch (error) {
		return errorResponse(error instanceof Error ? error.message : 'Error removing image');
	}
};
