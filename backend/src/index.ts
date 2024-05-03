import buildRouter from './router';
import { RouterType } from 'itty-router';

export interface Env {
	router?: RouterType;
	DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (env.router === undefined) {
			env.router = buildRouter(env);
		}

		return env.router.handle(request, env);
	},
};
