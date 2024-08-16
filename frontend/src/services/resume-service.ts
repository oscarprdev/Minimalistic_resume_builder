import { API_URL } from '@/constants';
import { Either, successResponse } from '@/lib/types';
import { handleErrorResponse } from '@/lib/utils';
import { Header, Resume } from '@/types';

interface IResumeService {
	describe(): Promise<Either<string, Resume[]>>;
}

export class ResumeService implements IResumeService {
	private readonly path: string = `${API_URL}/resume`;

	constructor(private readonly userConfig: { id: string; username: string }) {}

	async describe() {
		try {
			const response = await fetch(`${this.path}/${this.userConfig.id}/list`);
			const jsonResponse: Resume[] = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return handleErrorResponse(error, 'Error on describing resume');
		}
	}

	async create() {
		try {
			const id = crypto.randomUUID().toString();
			const response = await fetch(`${this.path}/${this.userConfig.id}/${id}/update`);
			const jsonResponse: string = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			return handleErrorResponse(error, 'Error on creating resume');
		}
	}
}
