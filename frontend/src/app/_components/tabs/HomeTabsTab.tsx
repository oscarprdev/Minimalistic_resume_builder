'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HomeTabsTabProps {
	title: string;
	resumeId: string;
	userId: string;
	resumeSelected: string;
}

const HomeTabsTab = ({ title, resumeId, userId, resumeSelected }: HomeTabsTabProps) => {
	const pathname = usePathname();
	const PATH = `${pathname}?user=${userId}&resume=${resumeId}`;

	const isTabSelected = resumeId === resumeSelected;

	return (
		<div>
			{isTabSelected ? 'selected' : 'no selected'}
			<Link href={PATH}>
				<p>{title}</p>
			</Link>
		</div>
	);
};

export default HomeTabsTab;
