'use client';

import { toast } from '../ui/use-toast';
import { updateResumeImageAction } from '@/app/actions/resume/update-resume-image';
import { isError } from '@/lib/types';
import { IconDownload } from '@tabler/icons-react';
import html2canvas from 'html2canvas';
import React, { Ref, forwardRef, useEffect, useImperativeHandle } from 'react';

export type DownloadPDFButtonRef = {
	handleDownloadPdf(): void;
};

const DownloadPDFButton = ({ resumeId }: { resumeId?: string }, ref: Ref<DownloadPDFButtonRef>) => {
	const handleDownloadPdf = () => {
		const header = document.querySelector('header');
		const addSectionBtn = document.getElementById('add-section-section');
		const main = document.querySelector('main');

		header?.classList.add('hidden');
		addSectionBtn?.classList.add('hidden');
		main?.classList.add('main-printed');

		window.print();
	};

	useImperativeHandle(ref, () => ({ handleDownloadPdf }));

	useEffect(() => {
		window.addEventListener('beforeprint', async () => {
			const main = document.querySelector('main');

			if (!main) return;

			await html2canvas(main).then(canvas => {
				canvas.toBlob(async blob => {
					if (!blob) return;

					const file = new File([blob], 'screenshot.png', { type: blob.type });
					const formData = new FormData();
					formData.append('image', file, 'screenshot.png');

					const response = await updateResumeImageAction(formData, resumeId);
					if (isError(response)) {
						return toast({
							variant: 'destructive',
							description: response.error,
						});
					}
				}, 'image/png');
			});
		});

		window.addEventListener('afterprint', event => {
			const header = document.querySelector('header');
			const addSectionBtn = document.getElementById('add-section-section');
			const main = document.querySelector('main');

			header?.classList.remove('hidden');
			addSectionBtn?.classList.remove('hidden');
			main?.classList.remove('main-printed');
		});
	});
	return (
		<div className="flex items-center gap-2 ">
			<IconDownload size={16} />
			<p className="text-xs ">Download</p>
		</div>
	);
};

export default forwardRef(DownloadPDFButton);
