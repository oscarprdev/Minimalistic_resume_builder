'use server';

import { listResumeAction } from '@/app/actions/resume/list-resume.action';
import { toast } from '@/components/ui/use-toast';
import { isLeft } from '@/lib/either';
import { getCallback } from '@/lib/service.utils';
import ViewerTitle from './ViewerTitle';

interface ViewerTitleServerProps {
	userId: string;
	resumeId: string | null;
}

const ViewerTitleServer = async ({ userId, resumeId }: ViewerTitleServerProps) => {
	const response = await listResumeAction({ userId, getCallback });
	if (isLeft(response)) {
		toast({ variant: 'destructive', description: response.left });
	}

	const resumeTitle = (!isLeft(response) && response.right.find((resume) => resume.id === resumeId)?.title) || 'Your resume needs a title';

	return <ViewerTitle resumeTitle={resumeTitle} />;
};

export default ViewerTitleServer;
