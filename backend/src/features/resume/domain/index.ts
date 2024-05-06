import { Database } from '../../core/infrastructure/database';
import { ResumeApplication } from '../application';
import { ResumeRouter } from './router';

export class ResumeFeature {
	constructor(private readonly database: Database) {}

	use() {
		const resumeApplication = new ResumeApplication(this.database);

		return new ResumeRouter(resumeApplication);
	}
}
