'use client';

import { useResumeInfoStore } from '@/store/useResumeInfoStore';
import ViewerTitle from './ViewerTitle';

const ViewerTitleClient = () => {
	const infoStore = useResumeInfoStore();

	return <ViewerTitle resumeTitle={infoStore.resumeInfo.title} />;
};

export default ViewerTitleClient;
