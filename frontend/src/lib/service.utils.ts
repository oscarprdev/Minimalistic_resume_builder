'use server';

import { Either, left, right } from './either';

export const getCallback = async <R>(path: string): Promise<Either<string, R>> => {
	try {
		const response = await fetch(path);

		if (response.status === 404) {
			throw new Error('Error not found');
		}

		const jsonResponse = await response.json();

		return right(jsonResponse);
	} catch (error) {
		return left(error instanceof Error ? error.message : 'Error fetching data');
	}
};

export const postCallback = async <P, R>(path: string, payload: P): Promise<Either<string, R>> => {
	try {
		const response = await fetch(path, {
			method: 'POST',
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error('Error');
		}

		const jsonResponse = await response.json();

		return right(jsonResponse);
	} catch (error) {
		return left(error instanceof Error ? error.message : 'Error fetching data');
	}
};
