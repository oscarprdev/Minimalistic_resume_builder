'use server';

import AsideSectionItem from './AsideSectionItem';
import { SectionControl } from '../_utils/sections';
import { SECTIONS } from '../_utils/sections';
import { User } from 'next-auth';

interface AsideSectionListProps {
	sectionSelected: SectionControl | null;
	resumeId: string | null;
	user?: User;
}

const AsideSectionList = ({ sectionSelected, resumeId, user }: AsideSectionListProps) => {
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
				/>
			))}
		</ul>
	);
};

export default AsideSectionList;
