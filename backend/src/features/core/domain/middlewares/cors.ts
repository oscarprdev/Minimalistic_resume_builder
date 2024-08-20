import { RequestParams } from '../interfaces';

const corsHeaders = {
	'Access-Control-Allow-Origin': 'https://minimalistic-resume-builder.vercel.app',
	'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT, DELETE',
	'Access-Control-Allow-Headers': '*',
};
const allowedOrigins = ['http://localhost:3000', 'https://minimalistic-resume-builder.vercel.app'];

const corsMiddleware = (handler: (request: RequestParams) => Promise<Response>) => {
	return async (request: RequestParams): Promise<Response> => {
		const origin = request.headers.get('Origin');

		const headers = { ...corsHeaders };
		if (origin && allowedOrigins.includes(origin)) {
			headers['Access-Control-Allow-Origin'] = origin;
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers,
			});
		}

		const { body, status, headers: responseHeaders } = await handler(request);

		const updatedResponse = new Response(body, {
			status,
			headers: {
				...responseHeaders,
				...headers,
			},
		});

		return updatedResponse;
	};
};

export { corsMiddleware, corsHeaders };
