'use server';

import { DELETE_IMAGE_INPUT_KEYWORD } from '../shared/types';
import { userAuth } from '../shared/user-auth';
import { deleteImageAction } from './delete-header-image';
import { BUCKET_ACCES_KEY, BUCKET_BASE_URL, BUCKET_KEY_ID, BUCKET_URL } from '@/constants';
import { errorResponse, isError } from '@/lib/types';
import { ResumeService } from '@/services/resume-service';
import { Bucket } from '@oprdev/cloudflare-r2-storage';

export const updateResumeImageAction = async (formData: FormData, id?: string) => {
	const user = await userAuth();

	const resumeService = new ResumeService({ id: user.id, username: user.username });
	let resumeId = id;

	if (!resumeId) {
		const response = await resumeService.describe();
		if (isError(response)) {
			return errorResponse('Error fetching resumes');
		}

		resumeId = response.success[0].id;
	}

	if (!Boolean(formData instanceof FormData)) return errorResponse('Image not valid');

	const removeResponse = await deleteImageAction(DELETE_IMAGE_INPUT_KEYWORD.RESUME, resumeId);
	if (isError(removeResponse)) {
		return errorResponse('Error deleting previous image');
	}

	const imageid = `${user.id}/resume-${crypto.randomUUID().toString()}`;

	const imageFile = formData.get('image') as File;
	const buffer = (await imageFile.arrayBuffer()) as Buffer;

	const bucket = new Bucket({
		endpoint: BUCKET_URL,
		accessKeyId: BUCKET_KEY_ID,
		secretAccessKey: BUCKET_ACCES_KEY,
		bucketName: 'resume',
	});

	const uploadedImage = await bucket.uploadFile({
		id: imageid,
		file: buffer,
		contentType: imageFile.type,
		project: resumeId,
	});

	console.log('upload image');

	return resumeService.updateImage(`${BUCKET_BASE_URL}/${uploadedImage}`, resumeId);
};
