export type ErrorScope = 'ROUTER';
export type ErrorStatus = 400 | 404 | 500;

interface ErrorEntity {
	handleError(): Response;
}

const ErrorMessages = {
	ROUTER: {
		400: 'Bad route request',
		404: 'Route not found',
		500: 'Internal router error',
	},
};

export class DefaultErrorEntity implements ErrorEntity {
	constructor(private readonly status: ErrorStatus, private readonly scope: ErrorScope) {}

	handleError() {
		return new Response(ErrorMessages[this.scope][this.status], { status: this.status });
	}
}
