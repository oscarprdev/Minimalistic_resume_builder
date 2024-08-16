'use client';

import { updateResumeImageAction } from '@/app/actions/resume/update-resume-image.action';
import { Button } from '@/components/ui/button';
import { Resume } from '@/types';
import { IconLoader2 } from '@tabler/icons-react';
import { User } from 'next-auth';
import { usePathname, useSearchParams } from 'next/navigation';
import { postCallback } from '@/services';
import { useCaptureResumeImage } from '@/hooks/useCaptureResumeImage';
import { generatePDF } from '@/lib/utils';

interface DownloadResumeButtonProps {
	user?: User;
}

const DownloadResumeButton = ({ user }: DownloadResumeButtonProps) => {
	const pathname = usePathname();
	const params = useSearchParams();

	const buttonIsVisible = user ? params.get('resume') : true && pathname.includes('builder');

	const { captureResumeImage, loading } = useCaptureResumeImage({
		theme: (params.get('theme') as Resume.theme) || Resume.theme.DEFAULT,
		onCanvasGeneratedCallback: async (canvas: HTMLCanvasElement, imgData: string) => {
			const resumeId = params.get('resume');
			const userId = user?.id;

			if (resumeId && userId) {
				await updateResumeImageAction({ resumeId, userId, payload: { image: imgData }, postCallback });
			}

			generatePDF(canvas, imgData);
		},
	});

	return (
		<>
			{buttonIsVisible && (
				<Button
					onClick={captureResumeImage}
					disabled={loading}
					className='flex gap-2'>
					{loading ? <IconLoader2 className='animate-spin text-white' /> : 'Download'}
				</Button>
			)}
		</>
	);
};

export default DownloadResumeButton;
