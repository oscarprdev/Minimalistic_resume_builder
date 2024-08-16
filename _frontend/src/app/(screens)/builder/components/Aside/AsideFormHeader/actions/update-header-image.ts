'use server';

import { removeImageAction } from '@/app/actions/resume/remove-image';
import { uploadImageAction } from '@/app/actions/resume/upload-image';
import { Either, isLeft, left, right } from '@/lib/either';

interface UpdateResumeHeaderImageActionPayload {
	formData: FormData;
}

export interface UpdateResumeHeaderImageAction {
	resumeId: string;
	userId: string;
	payload: UpdateResumeHeaderImageActionPayload;
}

export const updateResumeImageAction = async ({
	resumeId,
	userId,
	payload,
}: UpdateResumeHeaderImageAction): Promise<Either<string, string>> => {
	const { formData } = payload;
	if (!Boolean(formData instanceof FormData)) return left('Image not valid');

	const removeResponse = await removeImageAction({ resumeId, keyword: 'header' });
	if (isLeft(removeResponse)) {
		return left('Error deleting previous image');
	}

	const id = `${userId}/header-${crypto.randomUUID().toString()}`;
	const response = await uploadImageAction({ formData, resumeId, fileId: id });
	if (isLeft(response)) {
		return left('Error uploading image');
	}

	return right(response.right);
};
