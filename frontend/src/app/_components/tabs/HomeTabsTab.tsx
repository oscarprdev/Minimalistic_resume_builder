'use client';

import { cn } from '@/lib/utils';
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
		<div
			className={cn(
				'border-2 border-transparent py-2 px-5',
				isTabSelected ? 'border-b-purple_100 hover:border-b-purple_200' : 'border-b-transparent'
			)}>
			<Link href={PATH}>
				<p className={cn(' hover:text-gray-700', isTabSelected ? 'text-gray-600' : 'text-gray-400')}>{title}</p>
			</Link>
		</div>
	);
};

export default HomeTabsTab;
