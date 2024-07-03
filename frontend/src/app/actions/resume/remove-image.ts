'use server';

import { BUCKET_ACCES_KEY, BUCKET_KEY_ID, BUCKET_URL } from '@/constants';
import { Either, left, right } from '@/lib/either';
import { Bucket } from '@oprdev/cloudflare-r2-storage';

export interface RemoveImageInput {
	resumeId: string;
	keyword: 'header' | 'resume';
}

export const removeImageAction = async ({ resumeId, keyword }: RemoveImageInput): Promise<Either<string, string>> => {
	try {
		const bucket = new Bucket({
			endpoint: BUCKET_URL,
			accessKeyId: BUCKET_KEY_ID,
			secretAccessKey: BUCKET_ACCES_KEY,
			bucketName: 'resume',
		});

		const images = await bucket.getKeysByEntity({ entity: resumeId });
		if (Array.isArray(images) && images.length > 0) {
			const filteredImages = images.filter((img) => img.includes(keyword));

			if (filteredImages.length > 0) {
				await Promise.all([filteredImages.map((img) => bucket.deleteItemByKey({ key: img }))]);
			}
		}

		return right('');
	} catch (error) {
		return left(error instanceof Error ? error.message : 'Error removing image');
	}
};
