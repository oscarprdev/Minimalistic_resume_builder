'use client';

import { useRouterError } from '@/hooks/useRouterError';
import { strToCapitalized } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ViewerTitleProps {
	resumeTitle: string;
	error?: string;
}

const ViewerTitle = ({ resumeTitle, error }: ViewerTitleProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return <p>{strToCapitalized(resumeTitle)}</p>;
};

export default ViewerTitle;
