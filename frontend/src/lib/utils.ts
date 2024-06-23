import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isValidDateFormat(input: string) {
	const datePattern = /^(?:\d{4}[-/ ])?\d{2}[-/ ]\d{2}$/;

	return datePattern.test(input);
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

export function getTimeDifference(date1: string, date2: string) {
	const [year1, month1, day1] = date1.split('-').map(Number);
	const [year2, month2, day2] = date2.split('-').map(Number);

	const startDate = new Date(year1, month1 - 1, day1);
	const endDate = new Date(year2, month2 - 1, day2);

	let years = endDate.getFullYear() - startDate.getFullYear();
	let months = endDate.getMonth() - startDate.getMonth();

	if (months < 0) {
		years--;
		months += 12;
	}

	if (years > 0) {
		if (months > 0) {
			return `${years} year${years > 1 ? 's' : ''} and ${months} month${months > 1 ? 's' : ''}`;
		} else {
			return `${years} year${years > 1 ? 's' : ''}`;
		}
	} else if (months > 0) {
		return `${months} month${months > 1 ? 's' : ''}`;
	} else {
		return 'less than 1 month';
	}
}
