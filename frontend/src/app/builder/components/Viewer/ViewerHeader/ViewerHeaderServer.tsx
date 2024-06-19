'use server';

import { isLeft } from '@/lib/either';
import ViewerHeader from './ViewerHeader';
import { getCallback } from '@/lib/service.utils';
import { DEFAULT_HEADER_VALUES } from '@/store/useResumeHeaderStore';
import { describeResumeHeaderAction } from '../../Aside/AsideFormHeader/actions';

interface ViewerHeaderServerProps {
	userId: string;
	resumeId: string | null;
}

const ViewerHeaderServer = async ({ userId, resumeId }: ViewerHeaderServerProps) => {
	if (!resumeId) {
		return (
			<ViewerHeader
				name={DEFAULT_HEADER_VALUES.name}
				job={DEFAULT_HEADER_VALUES.job}
				location={DEFAULT_HEADER_VALUES.location}
				email={DEFAULT_HEADER_VALUES.email}
				phone={DEFAULT_HEADER_VALUES.phone}
				links={DEFAULT_HEADER_VALUES.links}
				image={DEFAULT_HEADER_VALUES.image}
			/>
		);
	}

	const response = await describeResumeHeaderAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return (
			<ViewerHeader
				name={DEFAULT_HEADER_VALUES.name}
				job={DEFAULT_HEADER_VALUES.job}
				location={DEFAULT_HEADER_VALUES.location}
				email={DEFAULT_HEADER_VALUES.email}
				phone={DEFAULT_HEADER_VALUES.phone}
				links={DEFAULT_HEADER_VALUES.links}
				image={DEFAULT_HEADER_VALUES.image}
				error={response.left}
			/>
		);
	}

	return (
		<ViewerHeader
			name={response.right.name}
			job={response.right.job}
			location={response.right.location}
			email={response.right.email}
			phone={response.right.phone}
			links={response.right.links}
			image={response.right.image}
		/>
	);
};

export default ViewerHeaderServer;
