'use server';

import AsideForm from './AsideForm';
import AsideSectionList from './AsideSectionList';
import { SectionControl } from '../_utils/sections';

interface AsideProps {
	sectionSelected: SectionControl | null;
	resumeId: string | null;
}

const Aside = ({ sectionSelected, resumeId }: AsideProps) => {
	return (
		<aside className='h-screen flex'>
			<AsideSectionList
				sectionSelected={sectionSelected}
				resumeId={resumeId}
			/>
			{sectionSelected && (
				<AsideForm
					sectionSelected={sectionSelected}
					resumeId={resumeId}
				/>
			)}
		</aside>
	);
};

export default Aside;
