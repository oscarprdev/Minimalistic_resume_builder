import { toast } from '@/components/ui/use-toast';
import { Resume } from '@/types';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';

interface UseCaptureResumeImageInput {
	theme: Resume.theme.DEFAULT | Resume.theme.VERTICAL;
	onCanvasGeneratedCallback: (canvas: HTMLCanvasElement, imgUrl: string) => Promise<void>;
}

export const useCaptureResumeImage = ({ theme, onCanvasGeneratedCallback }: UseCaptureResumeImageInput) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const captureResumeImage = () => {
		setLoading(true);

		const domElement = document.getElementById(`resume-viewer-${theme}`);
		if (!domElement) return;

		html2canvas(domElement, {
			scale: 2,
			logging: true,
			allowTaint: true,
			useCORS: true,
			onclone: (doc) => {
				switch (true) {
					case theme === Resume.theme.VERTICAL:
						fixVerticalResumeThemeStylesBeforePrint(doc);
						return;
					default:
						fixDefaultResumeThemeStylesBeforePrint(doc);
						return;
				}
			},
		})
			.then(async (canvas) => {
				const imgData = canvas.toDataURL('image/png', 1.0);
				await onCanvasGeneratedCallback(canvas, imgData);
			})
			.catch((e) => setError(e instanceof Error ? e.message : 'Error capturing resume image'))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (error) {
			toast({
				description: error,
				variant: 'destructive',
			});
		}
	}, [error]);

	return {
		captureResumeImage,
		loading,
	};
};

const fixDefaultResumeThemeStylesBeforePrint = (doc: Document) => {
	const resume = doc.getElementById('resume-viewer-default') as HTMLElement;

	if (!resume) return;

	resume.style.width = '800px';

	const svgElements = doc.querySelectorAll('#svg') as NodeListOf<HTMLElement>;
	for (let i = 0; i < svgElements.length; i++) {
		svgElements[i].style.position = 'absolute';
		svgElements[i].style.top = '6px';
	}

	const liTextElements = doc.querySelectorAll('#li-text') as NodeListOf<HTMLElement>;
	for (let i = 0; i < liTextElements.length; i++) {
		liTextElements[i].style.paddingLeft = '15px';
	}

	const liTitleElements = doc.querySelectorAll('#li-title') as NodeListOf<HTMLElement>;
	for (let i = 0; i < liTitleElements.length; i++) {
		liTitleElements[i].style.paddingLeft = '15px';
		liTitleElements[i].style.marginTop = '-3px';
	}

	const spanElements = doc.querySelectorAll('span') as NodeListOf<HTMLElement>;
	for (let i = 0; i < spanElements.length; i++) {
		spanElements[i].style.marginTop = '14px';
	}

	const datesElements = doc.querySelectorAll('#dates') as NodeListOf<HTMLElement>;
	for (let i = 0; i < datesElements.length; i++) {
		datesElements[i].style.marginTop = '3px';
	}
};

const fixVerticalResumeThemeStylesBeforePrint = (doc: Document) => {
	const resume = doc.getElementById('resume-viewer-vertical') as HTMLElement;

	if (!resume) return;

	resume.style.width = '800px';

	const svgElements = doc.querySelectorAll('#svg') as NodeListOf<HTMLElement>;
	for (let i = 0; i < svgElements.length; i++) {
		svgElements[i].style.position = 'absolute';
		svgElements[i].style.top = '6px';
	}

	const liTextElements = doc.querySelectorAll('#li-text') as NodeListOf<HTMLElement>;
	for (let i = 0; i < liTextElements.length; i++) {
		liTextElements[i].style.paddingLeft = '15px';
	}

	const liTitleElements = doc.querySelectorAll('#li-title') as NodeListOf<HTMLElement>;
	for (let i = 0; i < liTitleElements.length; i++) {
		liTitleElements[i].style.paddingLeft = '15px';
		liTitleElements[i].style.marginTop = '-3px';
	}

	const spanElements = doc.querySelectorAll('span') as NodeListOf<HTMLElement>;
	for (let i = 0; i < spanElements.length; i++) {
		spanElements[i].style.marginTop = '28px';
	}

	const lineExperienceElements = doc.querySelectorAll('#line-experience') as NodeListOf<HTMLElement>;
	for (let i = 0; i < lineExperienceElements.length; i++) {
		lineExperienceElements[i].style.marginTop = '5px';
	}

	const spanDatesElements = doc.querySelectorAll('#span-dates') as NodeListOf<HTMLElement>;
	for (let i = 0; i < spanDatesElements.length; i++) {
		spanDatesElements[i].style.marginTop = '14px';
	}

	const spanSummarylements = doc.querySelectorAll('#span-summary') as NodeListOf<HTMLElement>;
	for (let i = 0; i < spanSummarylements.length; i++) {
		spanSummarylements[i].style.marginTop = '7px';
	}

	const textSummaryElements = doc.querySelectorAll('#text-summary') as NodeListOf<HTMLElement>;
	for (let i = 0; i < textSummaryElements.length; i++) {
		textSummaryElements[i].style.paddingTop = '-25px';
	}

	const datesElements = doc.querySelectorAll('#dates') as NodeListOf<HTMLElement>;
	for (let i = 0; i < datesElements.length; i++) {
		datesElements[i].style.marginTop = '3px';
	}

	const headerImage = doc.getElementById('image-container');
	if (headerImage) {
		headerImage.style.right = '80px';
	}
};
