'use server';

import AsideForm from './AsideForm';
import AsideSectionList from './AsideSectionList';
import { SectionControl } from '../_utils/sections';
import { User } from 'next-auth';

interface AsideProps {
	sectionSelected: SectionControl | null;
	resumeId: string | null;
	user?: User;
}

const Aside = ({ sectionSelected, resumeId, user }: AsideProps) => {
	return (
		<aside className='h-full flex'>
			<AsideSectionList
				sectionSelected={sectionSelected}
				resumeId={resumeId}
				user={user}
			/>
			<AsideForm
				sectionSelected={sectionSelected}
				resumeId={resumeId}
				user={user}
			/>
		</aside>
	);
};

export default Aside;
