import { Database } from '../../core/infrastructure/database';
import { DefaultUserApplication } from '../application';
import { UserRouter } from './router';

export interface UserFeature {
	use(): UserRouter;
}

export class DefaultUserFeature implements UserFeature {
	constructor(private readonly database: Database) {}

	use() {
		const userApplication = new DefaultUserApplication(this.database);

		return new UserRouter(userApplication);
	}
}
