export type ErrorScope = 'ROUTER' | 'HEADER';
export type ErrorStatus = 400 | 404 | 500;

interface ErrorEntity {
	handleError(error: unknown): Response;
	sendError<A>(error: unknown, status: number, action: A): never;
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

	sendError<A>(error: unknown, status: number, action: A): never {
		const message =
			error instanceof Error ? `Error in ${action}: ${error.message}` : `Error in ${action}: ${error}`;
		const errorBody = {
			message,
			status,
		};

		throw new Error(JSON.stringify(errorBody));
	}
}
