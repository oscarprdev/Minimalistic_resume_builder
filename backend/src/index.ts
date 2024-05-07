import { Router } from './features/core/domain/router';
import { RouterType } from 'itty-router';
import { UserRouter } from './features/core/domain/router/user_router';
import { DefaultErrorEntity } from './features/core/domain/entities/Error';
import { Database } from './features/core/infrastructure/database';
import { DefaultResumeFeature } from './features/resume/domain';

export interface Env {
	router?: RouterType;
	DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response | void> {
		try {
			const database = new Database(env);

			if (request.url.includes('user')) {
				const userRouter = new UserRouter();
				const router = new Router(userRouter);

				env.router = router.router(request);

				return env.router.handle(request);
			}

			if (request.url.includes('resume')) {
				const resumeFeature = new DefaultResumeFeature(database);

				const router = new Router(resumeFeature.use());

				env.router = router.router(request);

				return env.router.handle(request);
			}

			new DefaultErrorEntity().sendError<'handlingRequest'>('Request not found', 404, 'handlingRequest');
		} catch (error: unknown) {
			console.log(error);
			return new DefaultErrorEntity().handleError(error);
		}
	},
};
