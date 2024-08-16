'use server';

import AsideSectionItem from './AsideSectionItem';
import { SectionControl } from '../_utils/sections';
import { SECTIONS } from '../_utils/sections';
import { User } from 'next-auth';
import { Resume } from '@/types';

interface AsideSectionListProps {
	sectionSelected: SectionControl | null;
	resumeId: string | null;
	user?: User;
	theme: Resume.theme;
}

const AsideSectionList = ({ sectionSelected, resumeId, user, theme }: AsideSectionListProps) => {
	return (
		<ul className='z-10 h-full flex flex-col w-1/4 min-w-[300px] bg-white shadow-sm border border-transparent border-r-gray-200'>
			{SECTIONS.map(({ label, control }) => (
				<AsideSectionItem
					key={label}
					label={label}
					control={control}
					sectionSelected={sectionSelected}
					resumeId={resumeId}
					user={user}
					theme={theme}
				/>
			))}
		</ul>
	);
};

export default AsideSectionList;
