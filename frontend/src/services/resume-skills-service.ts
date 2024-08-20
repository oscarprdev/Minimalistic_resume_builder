import { API_URL } from '@/constants';
import { Either, errorResponse, successResponse } from '@/lib/types';
import { Skills } from '@/types';

interface IResumeSkillsService {
	describe(resumeId: string): Promise<Either<string, Skills>>;
	update(values: Skills, resumeId: string): Promise<Either<string, string>>;
	delete(resumeId: string): Promise<Either<string, string>>;
}

export class ResumeSkillsService implements IResumeSkillsService {
	constructor(private readonly userInfo: { userId: string }) {}

	async describe(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/skills`, {
				cache: 'no-store',
			});
			const jsonResponse: Skills = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return errorResponse('Error getting resume skills');
		}
	}

	async update(values: Skills, resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/skills`, {
				method: 'POST',
				body: JSON.stringify(values),
			});
			const jsonResponse = await response.json();

			return successResponse('Skills successfully updatted');
		} catch (error) {
			return errorResponse('Error on updatting skills resume');
		}
	}

	async delete(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/skills`, {
				method: 'DELETE',
			});
			const jsonResponse = await response.json();

			return successResponse('Skills successfully deletted');
		} catch (error) {
			return errorResponse('Error on deletting skills resume');
		}
	}
}
