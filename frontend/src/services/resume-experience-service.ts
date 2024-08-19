import { API_URL } from '@/constants';
import { Either, errorResponse, successResponse } from '@/lib/types';
import { Experience } from '@/types';

interface IResumeExperienceService {
	describe(resumeId: string): Promise<Either<string, Experience>>;
	update(values: Experience, resumeId: string): Promise<Either<string, string>>;
	delete(resumeId: string): Promise<Either<string, string>>;
}

export class ResumeExperienceService implements IResumeExperienceService {
	constructor(private readonly userInfo: { userId: string }) {}

	async describe(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/experience`, {
				cache: 'no-store',
			});
			const jsonResponse: Experience = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return errorResponse('Error getting resume experience');
		}
	}

	async update(values: Experience, resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/experience`, {
				method: 'POST',
				body: JSON.stringify(values),
			});
			const jsonResponse = await response.json();

			return successResponse('Experience successfully updatted');
		} catch (error) {
			return errorResponse('Error on updatting experience resume');
		}
	}

	async delete(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/experience`, {
				method: 'DELETE',
			});
			const jsonResponse = await response.json();

			return successResponse('Experience successfully deletted');
		} catch (error) {
			return errorResponse('Error on deletting experience resume');
		}
	}
}
