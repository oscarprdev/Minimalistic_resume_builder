'use server';

import AsideSectionItem from './AsideSectionItem';
import { SectionControl } from '../_utils/sections';
import { SECTIONS } from '../_utils/sections';

interface AsideSectionListProps {
	sectionSelected: SectionControl | null;
	resumeId: string | null;
}

const AsideSectionList = ({ sectionSelected, resumeId }: AsideSectionListProps) => {
	return (
		<ul className='h-full flex flex-col w-1/4 min-w-[300px] bg-white shadow-sm border border-transparent border-r-gray-200'>
			{SECTIONS.map(({ label, control }) => (
				<AsideSectionItem
					key={label}
					label={label}
					control={control}
					sectionSelected={sectionSelected}
					resumeId={resumeId}
				/>
			))}
		</ul>
	);
};

export default AsideSectionList;
