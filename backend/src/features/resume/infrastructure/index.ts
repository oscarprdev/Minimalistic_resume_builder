import { Database } from '../../core/infrastructure/database';

export interface ResumeDatabase {}

export class DeaultResumeDatabase implements ResumeDatabase {
	constructor(private readonly database: Database) {}
}
