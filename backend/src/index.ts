import { Router } from './features/core/domain/router';
import { RouterType } from 'itty-router';
import { DefaultErrorEntity } from './features/core/domain/entities/Error';
import { Database } from './features/core/infrastructure/database';
import { DefaultResumeFeature } from './features/resume/domain';
import { DefaultUserFeature } from './features/user/domain';

export interface Env {
	router?: RouterType;
	DATABASE_URL: string;
	SALT: string;
	SECRET: string;
}
const VALID_RESUME_RESOURCES = [
	'list',
	'describe',
	'header',
	'summary',
	'experience',
	'education',
	'languages',
	'skills',
	'update',
	'delete',
];
const VALID_USER_RESOURCES = ['login', 'register'];

export default {
	async fetch(request: Request, env: Env): Promise<Response | void> {
		try {
			const database = new Database(env);

			if (request.url.includes('user') && VALID_USER_RESOURCES.some((resource) => request.url.includes(resource))) {
				const resumeFeature = new DefaultUserFeature(database);

				const router = new Router(resumeFeature.use());

				env.router = router.router({ env });

				return env.router.handle(request);
			}

			if (request.url.includes('resume') && VALID_RESUME_RESOURCES.some((resource) => request.url.includes(resource))) {
				const resumeFeature = new DefaultResumeFeature(database);

				const router = new Router(resumeFeature.use());

				env.router = router.router({});

				return env.router.handle(request);
			}

			new DefaultErrorEntity().sendError<'handlingRequest'>('Request not found', 404, 'handlingRequest');
		} catch (error: unknown) {
			console.log(error);
			return new DefaultErrorEntity().handleError(error);
		}
	},
};
