import { RouterType } from 'itty-router';
import { Env } from '../../..';

export interface RouterStrategy {
	handle(request: Request, env: Env): Promise<Response>;
	router(request: Request, env: Env): RouterType;
}

export class Router implements RouterStrategy {
	constructor(private readonly routerStrategy: RouterStrategy) {}

	async handle(request: Request, env: Env): Promise<Response> {
		return this.routerStrategy.handle(request, env);
	}

	router(request: Request, env: Env) {
		return this.routerStrategy.router(request, env);
	}
}
