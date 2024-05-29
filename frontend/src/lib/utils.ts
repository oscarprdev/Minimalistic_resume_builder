import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isValidDateFormat(input: string) {
	const datePattern = /^(?:\d{4}[-/ ])?\d{2}[-/ ]\d{2}$/;

	return datePattern.test(input);
}
