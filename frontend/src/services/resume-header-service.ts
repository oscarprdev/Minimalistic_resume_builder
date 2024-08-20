import { API_URL } from '@/constants';
import { Either, errorResponse, successResponse } from '@/lib/types';
import { Header } from '@/types';

interface IResumeHeaderService {
	describe(resumeId: string): Promise<Either<string, Header>>;
	update(values: Header, resumeId: string): Promise<Either<string, string>>;
}

export class ResumeHeaderService implements IResumeHeaderService {
	constructor(private readonly userInfo: { userId: string }) {}

	async describe(resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/header`, {
				cache: 'no-store',
			});
			const jsonResponse: Header = await response.json();
			return successResponse(jsonResponse);
		} catch (error) {
			return errorResponse('Error getting resume header');
		}
	}

	async update(values: Header, resumeId: string) {
		try {
			const response = await fetch(`${API_URL}/resume/${this.userInfo.userId}/${resumeId}/header`, {
				method: 'POST',
				body: JSON.stringify(values),
			});
			const jsonResponse = await response.json();

			return successResponse('Header successfully updatted');
		} catch (error) {
			return errorResponse('Error on updatting header resume');
		}
	}
}
