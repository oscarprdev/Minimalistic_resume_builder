import { Database } from '../../core/infrastructure/database';
import { DefaultResumeApplication } from '../application';
import { ResumeRouter } from './router';

export interface ResumeFeature {
	use(): ResumeRouter;
}

export class DefaultResumeFeature implements ResumeFeature {
	constructor(private readonly database: Database) {}

	use() {
		const resumeApplication = new DefaultResumeApplication(this.database);

		return new ResumeRouter(resumeApplication);
	}
}
