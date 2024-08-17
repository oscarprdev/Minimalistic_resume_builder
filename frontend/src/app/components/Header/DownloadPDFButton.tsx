'use client';

import { IconFileDownload } from '@tabler/icons-react';
import React, { Ref, forwardRef, useEffect, useImperativeHandle } from 'react';

export type DownloadPDFButtonRef = {
	handleDownloadPdf(): void;
};

const DownloadPDFButton = ({}, ref: Ref<DownloadPDFButtonRef>) => {
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
			<IconFileDownload size={16} />
			<p className="text-xs ">Download</p>
		</div>
	);
};

export default forwardRef(DownloadPDFButton);
