'use client';

import { updateResumeImageAction } from '@/app/actions/resume/update-resume-image.action';
import { Button } from '@/components/ui/button';
import { IconLoader2 } from '@tabler/icons-react';
import { User } from 'next-auth';
import { usePathname } from 'next/navigation';
import { postCallback } from '@/services';
import { useCaptureResumeImage } from '@/hooks/useCaptureResumeImage';
import { generatePDF } from '@/lib/utils';
import { useContext } from 'react';
import { paramsContext } from '@/providers/ParamsProvider';

interface DownloadResumeButtonProps {
	user?: User;
}

const DownloadResumeButton = ({ user }: DownloadResumeButtonProps) => {
	const pathname = usePathname();
	const { theme, resumeId } = useContext(paramsContext);

	const buttonIsVisible = user ? resumeId : pathname.includes('builder');

	const { captureResumeImage, loading } = useCaptureResumeImage({
		theme,
		onCanvasGeneratedCallback: async (canvas: HTMLCanvasElement, imgData: string) => {
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
