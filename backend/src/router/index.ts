import { Router, RouterType } from 'itty-router';
import { Env } from '..';
import { neon } from '@neondatabase/serverless';

function buildRouter(env: Env): RouterType {
	const router = Router();

	router.get('/', async (request: Request, env: Env) => {
		const sql = neon(env.DATABASE_URL);
		const posts = await sql('SELECT * FROM users;');
		return new Response(JSON.stringify(posts), {
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
