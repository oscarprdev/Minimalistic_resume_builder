'use server';

import { API_URL } from '@/constants';
import { Either, isLeft, left } from '@/lib/either';
import { dataURLToBlob } from '@/lib/utils';
import { removeImageAction } from './remove-image';
import { uploadImageAction } from './upload-image';

interface UpdateResumeImageActionPayload {
	image: string;
}

export interface UpdateResumeThemeAction {
	resumeId: string;
	userId: string;
	payload: UpdateResumeImageActionPayload;
	postCallback: (path: string, payload: UpdateResumeImageActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeImageAction = async ({
	resumeId,
	userId,
	payload,
	postCallback,
}: UpdateResumeThemeAction): Promise<Either<string, string>> => {
	const { image } = payload;
	const imageData = dataURLToBlob(image);

	const formData: FormData = new FormData();
	formData.append('image', imageData);

	const removeResponse = await removeImageAction({ resumeId, keyword: 'resume' });
	if (isLeft(removeResponse)) {
		throw new Error(removeResponse.left);
	}

	const id = `${userId}/resume-${crypto.randomUUID().toString()}`;
	const response = await uploadImageAction({ formData, resumeId, fileId: id });
	if (isLeft(response)) {
		throw new Error(response.left);
	}

	const uploadedImage = response.right;
	if (!uploadedImage) {
		throw new Error('Error uploading imag');
	}

	const path = `${API_URL}/resume/${userId}/${resumeId}/update`;

	return await postCallback(path, { image: uploadedImage });
};
