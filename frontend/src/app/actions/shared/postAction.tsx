'use server';

interface PostActionInput {
	path: string;
	body: BodyInit;
}

export const postAction = async ({ path, body }: PostActionInput) => {
	const response = await fetch(path, {
		method: 'POST',
		body,
		headers: {
			'content-type': 'application/json',
		},
		cache: 'no-store',
	});

	if (response.status === 500) {
		throw new Error('Error');
	}
};
