import { RouterStrategy } from '../interfaces';

export class Router implements RouterStrategy {
	constructor(private readonly routerStrategy: RouterStrategy) {}

	async handle(request: Request): Promise<Response> {
		return this.routerStrategy.handle(request);
	}

	router(request: Request) {
		return this.routerStrategy.router(request);
	}
}
