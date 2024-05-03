import { Router, RouterType } from 'itty-router';
import { Env } from '..';

function buildRouter(env: Env): RouterType {
	const router = Router();

	router.get('/', async (request: Request, env: Env) => {
		return new Response('Hello world 2', {
			status: 200,
		});
	});

	router.all('*', (request) => {
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
			});
		}

		new Response('Request not found', { status: 404 });
	});

	return router;
}

export default buildRouter;
