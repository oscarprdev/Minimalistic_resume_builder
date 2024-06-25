'use client';

import { Button } from '@/components/ui/button';
import { IconLoader2 } from '@tabler/icons-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { User } from 'next-auth';
import { usePathname, useSearchParams } from 'next/navigation';
import { startTransition, useState } from 'react';

interface DownloadResumeButtonProps {
	user?: User;
}

const DownloadResumeButton = ({ user }: DownloadResumeButtonProps) => {
	const [loading, setLoading] = useState(false);
	const pathname = usePathname();
	const params = useSearchParams();

	const buttonIsVisible = user ? params.get('resume') : true && pathname.includes('builder');

	const handleDownloadResumeClick = async () => {
		setLoading(true);

		startTransition(() => {
			const domElement = document.getElementById('resume-viewer');

			if (domElement) {
				html2canvas(domElement, {
					scale: 2,
					logging: true,
					allowTaint: true,
					useCORS: true,
					onclone: (doc) => {
						const resume = doc.getElementById('resume-viewer') as HTMLElement;
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
							spanElements[i].style.marginTop = '12px';
						}
					},
				})
					.then((canvas) => {
						const imgData = canvas.toDataURL('image/png', 1.0);
						const pdf = new jsPDF('p', 'mm', 'a4', true);
						const pdfWidth = pdf.internal.pageSize.getWidth();
						const pdfHeight = pdf.internal.pageSize.getHeight();
						const imgWidth = canvas.width;
						const imgHeight = canvas.height;
						const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
						const imgX = (pdfWidth - imgWidth * ratio) / 2;
						const imgY = 0;
						pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
						pdf.save('resume.pdf');
					})
					.catch((e) => console.log(e))
					.finally(() => setLoading(false));
			}
		});
	};

	return (
		<>
			{buttonIsVisible && (
				<Button
					onClick={handleDownloadResumeClick}
					disabled={loading}
					className='flex gap-2'>
					{loading ? <IconLoader2 className='animate-spin text-white' /> : 'Download'}
				</Button>
			)}
		</>
	);
};

export default DownloadResumeButton;
