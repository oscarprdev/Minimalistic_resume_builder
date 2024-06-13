'use server';

import { BUCKET_ACCES_KEY, BUCKET_BASE_URL, BUCKET_KEY_ID, BUCKET_URL } from '@/constants';
import { Bucket } from '@oprdev/cloudflare-r2-storage';

export interface UploadImageInput {
	formData: FormData;
	userId: string;
}

export const uploadImage = async ({ formData, userId }: UploadImageInput) => {
	const imageFile = formData.get('image') as File;
	const buffer = (await imageFile.arrayBuffer()) as Buffer;

	const id = `${userId}/${crypto.randomUUID().toString()}`;

	const bucket = new Bucket({
		endpoint: BUCKET_URL,
		accessKeyId: BUCKET_KEY_ID,
		secretAccessKey: BUCKET_ACCES_KEY,
		bucketName: 'resume',
	});

	const uploadedImage = await bucket.uploadFile({
		file: buffer,
		id,
		contentType: imageFile.type,
		project: '',
	});

	return `${BUCKET_BASE_URL}/${uploadedImage}`;
};
