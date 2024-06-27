'use server';

import { Either, left, right } from '../lib/either';

export const getCallback = async <R>(path: string): Promise<Either<string, R>> => {
	try {
		const response = await fetch(path, { cache: 'no-store' });

		if (response.status === 404 || !response.ok) {
			throw new Error(`Error: ${response.status} - ${response.url}`);
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
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} - ${response.url}`);
		}

		const jsonResponse = await response.json();

		return right(jsonResponse);
	} catch (error) {
		return left(error instanceof Error ? error.message : 'Error updating data');
	}
};

export const deleteCallback = async <R>(path: string): Promise<Either<string, R>> => {
	try {
		const response = await fetch(path, {
			method: 'DELETE',
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} - ${response.url}`);
		}

		const jsonResponse = await response.json();

		return right(jsonResponse);
	} catch (error) {
		return left(error instanceof Error ? error.message : 'Error deleting data');
	}
};
