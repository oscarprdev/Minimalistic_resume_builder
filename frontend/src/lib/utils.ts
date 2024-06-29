import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function strToCapitalized(str: string) {
	if (str.length === 0) {
		return str;
	}

	return str[0].toUpperCase() + str.slice(1, str.length);
}

export function addParamToPath(param: string) {
	const currentUrl = new URL(window.location.href);
	const pathWithQuery = `${currentUrl.pathname}${currentUrl.search}`;

	return `${pathWithQuery}${pathWithQuery.includes('?') ? '&' : '?'}${param}`;
}

export function isTruthyNumber(value: any) {
	return typeof value === 'number' && !isNaN(value);
}
