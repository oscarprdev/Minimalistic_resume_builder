import { RouterStrategy } from '.';
import { Env } from '../../..';
import { Router, RouterType } from 'itty-router';

export class ResumeRouter implements RouterStrategy {
	public internalRouter: RouterType;

	constructor() {
		this.internalRouter = Router();
	}

	router(request: Request, env: Env): RouterType {
		this.routeController(request, env);
		return this.internalRouter;
	}

	async handle(request: Request, env: Env): Promise<Response> {
		return this.internalRouter.handle(request, env);
	}

	private routeController(request: Request, env: Env) {
		const url = new URL(request.url);
		const path = url.pathname;

		switch (path) {
			case '/resume':
				this.getResume(request, env);
				break;
			case '/resume/list':
				this.getResumeList(request, env);
				break;
			default:
				return new Response('Route not found', { status: 404 });
		}
	}

	private getResume(request: Request, env: Env) {
		this.internalRouter.get('/resume', async (request: Request, env: Env) => {
			return new Response('get resume', {
				status: 200,
			});
		});
	}

	private getResumeList(request: Request, env: Env) {
		this.internalRouter.get('/', async (request: Request, env: Env) => {
			return new Response('get resume list', {
				status: 200,
			});
		});
	}
}
