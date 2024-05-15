'use server';

import { redirect } from 'next/navigation';
import HomeTabsTab from './HomeTabsTab';
import { listResume } from '@/app/actions/resume/global/list-resume';

interface HomeTabsProps {
	userId: string;
	resumeSelected?: string;
}

const HomeTabs = async ({ userId, resumeSelected }: HomeTabsProps) => {
	const { data, error } = await listResume({ userId });

	if (error) {
		return <p>{error}</p>;
	}

	if (data.length === 0) {
		return <p>No data</p>;
	}

	if (!resumeSelected) {
		redirect(`/?user=${userId}&resume=${data[0].id}`);
	}

	return (
		<div>
			{data.map((resume) => (
				<HomeTabsTab
					key={resume.id}
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
