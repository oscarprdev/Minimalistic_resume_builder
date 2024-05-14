'use server';

import HomeTabsTab from './HomeTabsTab';
import { listResume } from '@/app/actions/resume/global/list-resume';

interface HomeTabsProps {
	userId: string;
	resumeSelected: string;
}

const HomeTabs = async ({ userId, resumeSelected }: HomeTabsProps) => {
	const { data, error } = await listResume({ userId });

	if (error) {
		return <p>{error}</p>;
	}

	if (data.length === 0) {
		return <p>No data</p>;
	}

	return (
		<div>
			{data.map((resume) => (
				<HomeTabsTab
					userId={userId}
					resumeId={resume.id}
					title={resume.title}
					resumeSelected={resumeSelected}
				/>
			))}
		</div>
	);
};

export default HomeTabs;
