'use server';

import { DELETE_IMAGE_INPUT_KEYWORD } from '../shared/types';
import { userAuth } from '../shared/user-auth';
import { deleteImageAction } from './delete-header-image';
import { BUCKET_ACCES_KEY, BUCKET_BASE_URL, BUCKET_KEY_ID, BUCKET_URL } from '@/constants';
import { errorResponse, isError, successResponse } from '@/lib/types';
import { Bucket } from '@oprdev/cloudflare-r2-storage';

export const updateHeaderImageAction = async (formData: FormData, resumeId: string) => {
	const user = await userAuth();

	if (!Boolean(formData instanceof FormData)) return errorResponse('Image not valid');

	const removeResponse = await deleteImageAction(DELETE_IMAGE_INPUT_KEYWORD.HEADER, resumeId);
	if (isError(removeResponse)) {
		return errorResponse('Error deleting previous image');
	}

	const id = `${user.id}/header-${crypto.randomUUID().toString()}`;

	const imageFile = formData.get('image') as File;
	const buffer = (await imageFile.arrayBuffer()) as Buffer;

	const bucket = new Bucket({
		endpoint: BUCKET_URL,
		accessKeyId: BUCKET_KEY_ID,
		secretAccessKey: BUCKET_ACCES_KEY,
		bucketName: 'resume',
	});

	const uploadedImage = await bucket.uploadFile({
		id,
		file: buffer,
		contentType: imageFile.type,
		project: resumeId,
	});

	return successResponse(`${BUCKET_BASE_URL}/${uploadedImage}`);
};
