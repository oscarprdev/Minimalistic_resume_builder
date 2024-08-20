import { API_URL } from '@/constants';
import { Either, errorResponse, successResponse } from '@/lib/types';
import { Resume, ResumeCompleted } from '@/types';

interface IResumeService {
	describe(): Promise<Either<string, Resume[]>>;
	describeById(resumeId: string): Promise<Either<string, ResumeCompleted>>;
	create(id: string, title: string): Promise<Either<string, string>>;
	updateImage(imageUrl: string, resumeId: string): Promise<Either<string, string>>;
}

export class ResumeService implements IResumeService {
	private readonly path: string = `${API_URL}/resume`;

	constructor(private readonly userConfig: { id: string; username: string }) {}

	async describe() {
		try {
			const response = await fetch(`${this.path}/${this.userConfig.id}/list`, {
				cache: 'no-cache',
			});
			const jsonResponse: Resume[] = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return errorResponse('Error on describing resume');
		}
	}

	async describeById(resumeId: string) {
		try {
			const response = await fetch(`${this.path}/${this.userConfig.id}/${resumeId}/describe`, {
				cache: 'no-cache',
			});
			const jsonResponse: ResumeCompleted = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			console.log('responseerror', error);
			return errorResponse('Resume ID not valid');
		}
	}

	async create(id: string, title: string) {
		try {
			const response = await fetch(`${this.path}/${this.userConfig.id}/${id}/update`, {
				method: 'POST',
				body: JSON.stringify({ id, title }),
			});
			const jsonResponse: string = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return errorResponse('Error on creating resume');
		}
	}

	async updateImage(imageUrl: string, resumeId: string) {
		try {
			const response = await fetch(`${this.path}/${this.userConfig.id}/${resumeId}/update`, {
				method: 'POST',
				body: JSON.stringify({ image: imageUrl }),
			});
			const jsonResponse: string = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return errorResponse('Error on updating resume image');
		}
	}
}
