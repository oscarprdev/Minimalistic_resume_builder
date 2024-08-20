import { API_URL } from '@/constants';
import { Either, errorResponse, successResponse } from '@/lib/types';
import { Languages } from '@/types';

interface IResumeLanguagesService {
	describe(resumeId: string): Promise<Either<string, Languages>>;
	update(values: Languages, resumeId: string): Promise<Either<string, string>>;
	delete(resumeId: string): Promise<Either<string, string>>;
}

export class ResumeLanguagesService implements IResumeLanguagesService {
	constructor(private readonly userInfo: { userId: string }) {}

	async describe(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/languages`, {
				cache: 'no-store',
			});
			const jsonResponse: Languages = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return errorResponse('Error getting resume languages');
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
			return errorResponse('Error on updatting languages resume');
		}
	}

	async delete(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/languages`, {
				method: 'DELETE',
			});
			const jsonResponse = await response.json();

			return successResponse('Languages successfully deletted');
		} catch (error) {
			return errorResponse('Error on deletting languages resume');
		}
	}
}
