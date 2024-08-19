import { API_URL } from '@/constants';
import { Either, errorResponse, successResponse } from '@/lib/types';
import { Education } from '@/types';

interface IResumeEducationService {
	describe(resumeId: string): Promise<Either<string, Education>>;
	update(values: Education, resumeId: string): Promise<Either<string, string>>;
	delete(resumeId: string): Promise<Either<string, string>>;
}

export class ResumeEducationService implements IResumeEducationService {
	constructor(private readonly userInfo: { userId: string }) {}

	async describe(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/education`, {
				cache: 'no-store',
			});
			const jsonResponse: Education = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return errorResponse('Error getting resume education');
		}
	}

	async update(values: Education, resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/education`, {
				method: 'POST',
				body: JSON.stringify(values),
			});
			const jsonResponse = await response.json();

			return successResponse('Education successfully updatted');
		} catch (error) {
			return errorResponse('Error on updatting education resume');
		}
	}

	async delete(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/education`, {
				method: 'DELETE',
			});
			const jsonResponse = await response.json();

			return successResponse('Education successfully deletted');
		} catch (error) {
			return errorResponse('Error on deletting education resume');
		}
	}
}
