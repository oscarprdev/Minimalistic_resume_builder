export type ErrorScope = 'ROUTER' | 'HEADER';
export type ErrorStatus = 400 | 404 | 500;

interface ErrorEntity {
	handleError(error: unknown): Response;
	sendError(message: string, status: number): void;
}

export class DefaultErrorEntity implements ErrorEntity {
	constructor() {}

	handleError(error: unknown) {
		if (error instanceof Error) {
			if (error.message.includes('status')) {
				const { message, status } = JSON.parse(error.message);

				return new Response(message, { status });
			}

			return new Response(error.message, { status: 500 });
		}

		return new Response('Internal error', { status: 500 });
	}

	sendError(message: string, status: number) {
		const errorBody = {
			message,
			status,
		};

		throw new Error(JSON.stringify(errorBody));
	}
}
