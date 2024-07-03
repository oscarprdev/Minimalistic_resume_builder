'use server';

import { BUCKET_ACCES_KEY, BUCKET_BASE_URL, BUCKET_KEY_ID, BUCKET_URL } from '@/constants';
import { Either, isLeft, left, right } from '@/lib/either';
import { Bucket } from '@oprdev/cloudflare-r2-storage';
import { removeImageAction } from './remove-image';

export interface UploadImageInput {
	formData: FormData;
	resumeId: string;
	fileId: string;
}

export const uploadImageAction = async ({ formData, resumeId, fileId }: UploadImageInput): Promise<Either<string, string>> => {
	try {
		const imageFile = formData.get('image') as File;
		const buffer = (await imageFile.arrayBuffer()) as Buffer;

		const bucket = new Bucket({
			endpoint: BUCKET_URL,
			accessKeyId: BUCKET_KEY_ID,
			secretAccessKey: BUCKET_ACCES_KEY,
			bucketName: 'resume',
		});

		const uploadedImage = await bucket.uploadFile({
			file: buffer,
			id: fileId,
			contentType: imageFile.type,
			project: resumeId,
		});

		return right(`${BUCKET_BASE_URL}/${uploadedImage}`);
	} catch (error) {
		console.log(error);
		return left(error instanceof Error ? error.message : 'Error uploading image');
	}
};
