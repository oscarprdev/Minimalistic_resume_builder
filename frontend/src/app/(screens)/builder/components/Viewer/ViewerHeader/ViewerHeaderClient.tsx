'use client';

import ViewerHeader from './ViewerHeader';
import { useResumeHeaderStore } from '@/store/useResumeHeaderStore';

const ViewerHeaderClient = () => {
	const headerStore = useResumeHeaderStore();

	return (
		<ViewerHeader
			name={headerStore.resumeHeader.name}
			job={headerStore.resumeHeader.job}
			location={headerStore.resumeHeader.location}
			email={headerStore.resumeHeader.email}
			phone={headerStore.resumeHeader.phone}
			links={headerStore.resumeHeader.links}
			image={headerStore.resumeHeader.image}
		/>
	);
};

export default ViewerHeaderClient;
