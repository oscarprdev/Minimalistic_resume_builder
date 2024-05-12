import { Env } from '../../../..';
import { RouterInput, RouterStrategy } from '../interfaces';

export class Router implements RouterStrategy {
	constructor(private readonly routerStrategy: RouterStrategy) {}

	async handle(request: Request): Promise<Response> {
		return this.routerStrategy.handle(request);
	}

	router(input: RouterInput) {
		return this.routerStrategy.router(input);
	}
}
