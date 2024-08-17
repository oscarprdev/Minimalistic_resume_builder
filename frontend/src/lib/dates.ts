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
		return '-1 month';
	}
}

export function formatDateToValidFormat(date: Date) {
	return date.toISOString().split('T')[0];
}
