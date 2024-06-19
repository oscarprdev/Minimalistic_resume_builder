'use server';

import { BUCKET_ACCES_KEY, BUCKET_BASE_URL, BUCKET_KEY_ID, BUCKET_URL } from '@/constants';
import { Either, left, right } from '@/lib/either';
import { Bucket } from '@oprdev/cloudflare-r2-storage';

export interface UploadImageInput {
	formData: FormData;
	userId: string;
	resumeId: string;
}

export const uploadImage = async ({ formData, userId, resumeId }: UploadImageInput): Promise<Either<string, string>> => {
	try {
		const imageFile = formData.get('image') as File;
		const buffer = (await imageFile.arrayBuffer()) as Buffer;

		const id = `${userId}/${crypto.randomUUID().toString()}`;

		const bucket = new Bucket({
			endpoint: BUCKET_URL,
			accessKeyId: BUCKET_KEY_ID,
			secretAccessKey: BUCKET_ACCES_KEY,
			bucketName: 'resume',
		});

		const images = await bucket.getKeysByEntity({ entity: resumeId });
		if (Array.isArray(images) && images.length > 0) {
			await Promise.all([images.map((img) => bucket.deleteItemByKey({ key: img }))]);
		}

		const uploadedImage = await bucket.uploadFile({
			file: buffer,
			id,
			contentType: imageFile.type,
			project: resumeId,
		});

		return right(`${BUCKET_BASE_URL}/${uploadedImage}`);
	} catch (error) {
		return left(error instanceof Error ? error.message : 'Error uploading image');
	}
};
