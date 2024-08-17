import { API_URL } from '@/constants';
import { Either, successResponse } from '@/lib/types';
import { handleErrorResponse } from '@/lib/utils';
import { Languages } from '@/types';

interface IResumeLanguagesService {
	describe(resumeId: string): Promise<Either<string, Languages>>;
	update(values: Languages, resumeId: string): Promise<Either<string, string>>;
}

export class ResumeLanguagesService implements IResumeLanguagesService {
	constructor(private readonly userInfo: { userId: string }) {}

	async describe(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/languages`);
			const jsonResponse: Languages = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return handleErrorResponse(error, 'Error getting resume languages');
		}
	}

	async update(values: Languages, resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/languages`, {
				method: 'POST',
				body: JSON.stringify(values),
			});
			const jsonResponse = await response.json();

			return successResponse('Languages successfully updatted');
		} catch (error) {
			return handleErrorResponse(error, 'Error on updatting languages resume');
		}
	}
}
