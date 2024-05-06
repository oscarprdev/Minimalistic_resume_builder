import { Env } from '../../../..';
import { Router, RouterType } from 'itty-router';
import { RouterStrategy } from '../interfaces';

export class UserRouter implements RouterStrategy {
	public internalRouter: RouterType;

	constructor() {
		this.internalRouter = Router();
	}

	router(request: Request): RouterType {
		this.routeController(request);
		return this.internalRouter;
	}

	async handle(request: Request): Promise<Response> {
		return this.internalRouter.handle(request);
	}

	private routeController(request: Request) {
		const url = new URL(request.url);
		const path = url.pathname;

		switch (path) {
			case '/user':
				this.getUser(request);
				break;
			case '/user/list':
				this.getUserList(request);
				break;
			default:
				return new Response('Route not found', { status: 404 });
		}
	}

	private getUser(request: Request) {
		this.internalRouter.get('/user', async (request: Request) => {
			return new Response('get user', {
				status: 200,
			});
		});
	}

	private getUserList(request: Request) {
		this.internalRouter.get('/user/list', async (request: Request) => {
			return new Response('get user list', {
				status: 200,
			});
		});
	}
}
