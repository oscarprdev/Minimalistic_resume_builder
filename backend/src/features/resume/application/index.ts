import { Database } from '../../core/infrastructure/database';
import { DeaultResumeDatabase } from '../infrastructure';
import { HeaderUsecase } from './header';

export class ResumeApplication {
	constructor(private readonly database: Database) {}

	headerUsecase() {
		const resumeDatabase = new DeaultResumeDatabase(this.database);

		return new HeaderUsecase(resumeDatabase);
	}
}
