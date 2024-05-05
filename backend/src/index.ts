import { Router } from './core/domain/router';
import { RouterType } from 'itty-router';
import { UserRouter } from './core/domain/router/user_router';
import { ResumeRouter } from './core/domain/router/resume_router';

export interface Env {
	router?: RouterType;
	DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.url.includes('user')) {
			const userRouter = new UserRouter();
			const router = new Router(userRouter);

			env.router = router.router(request, env);

			return env.router.handle(request, env);
		}

		if (request.url.includes('resume')) {
			const resumeRouter = new ResumeRouter();
			const router = new Router(resumeRouter);

			env.router = router.router(request, env);

			return env.router.handle(request, env);
		}

		return new Response('Route not found', { status: 404 });
	},
};
