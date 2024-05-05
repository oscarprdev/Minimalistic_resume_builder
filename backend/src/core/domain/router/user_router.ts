import { RouterStrategy } from '.';
import { Env } from '../../..';
import { Router, RouterType } from 'itty-router';

export class UserRouter implements RouterStrategy {
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
			case '/user':
				this.getUser(request, env);
				break;
			case '/user/list':
				this.getUserList(request, env);
				break;
			default:
				return new Response('Route not found', { status: 404 });
		}
	}

	private getUser(request: Request, env: Env) {
		this.internalRouter.get('/user', async (request: Request, env: Env) => {
			return new Response('get user', {
				status: 200,
			});
		});
	}

	private getUserList(request: Request, env: Env) {
		this.internalRouter.get('/user/list', async (request: Request, env: Env) => {
			return new Response('get user list', {
				status: 200,
			});
		});
	}
}
