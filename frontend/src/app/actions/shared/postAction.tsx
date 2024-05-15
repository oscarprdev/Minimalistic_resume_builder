'use server';

interface PostActionInput {
	path: string;
	body: BodyInit;
}

export const postAction = async ({ path, body }: PostActionInput) => {
	await fetch(path, {
		method: 'POST',
		body,
		headers: {
			'content-type': 'application/json',
		},
		cache: 'no-store',
	});
};
