import { type ClassValue, clsx } from 'clsx';
import jsPDF from 'jspdf';
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

export function dataURLToBlob(dataURL: string) {
	const binary = atob(dataURL.split(',')[1]);
	const array = [];
	for (let i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	return new Blob([new Uint8Array(array)], { type: 'image/png' });
}

export const generatePDF = (canvas: HTMLCanvasElement, imgUrl: string) => {
	const pdf = new jsPDF('p', 'mm', 'a4', true);
	const pdfWidth = pdf.internal.pageSize.getWidth();
	const pdfHeight = pdf.internal.pageSize.getHeight();
	const imgWidth = canvas.width;
	const imgHeight = canvas.height;
	const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
	const imgX = (pdfWidth - imgWidth * ratio) / 2;
	const imgY = -5;

	pdf.addImage(imgUrl, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
	pdf.save('resume.pdf');
};
