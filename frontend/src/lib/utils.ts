import { errorResponse } from './types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function handleErrorResponse(error: unknown, defaultMessage: string) {
	return errorResponse(error instanceof Error ? error.message : defaultMessage);
}
