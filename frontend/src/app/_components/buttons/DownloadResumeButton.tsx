'use client';

import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadResumeButton = () => {
	const handleDownloadResumeClick = async () => {
		const domElement = document.getElementById('resume-viewer');

		if (domElement) {
			html2canvas(domElement, {
				scale: 2,
				logging: true,
				allowTaint: true,
				useCORS: true,
				onclone: (doc) => {
					const svgElements = doc.querySelectorAll('#svg') as NodeListOf<HTMLElement>;
					for (let i = 0; i < svgElements.length; i++) {
						svgElements[i].style.position = 'absolute';
						svgElements[i].style.top = '6px';
					}

					const liTextElements = doc.querySelectorAll('#li-text') as NodeListOf<HTMLElement>;
					for (let i = 0; i < liTextElements.length; i++) {
						liTextElements[i].style.paddingLeft = '15px';
					}
				},
			})
				.then((canvas) => {
					const imgData = canvas.toDataURL('image/png');
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
				.catch((e) => console.log(e));
		}
	};

	return <Button onClick={handleDownloadResumeClick}>Download Resume</Button>;
};

export default DownloadResumeButton;
