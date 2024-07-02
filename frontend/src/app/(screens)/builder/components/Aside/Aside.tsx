'use server';

import AsideForm from './AsideForm';
import AsideSectionList from './AsideSectionList';
import { SectionControl } from '../_utils/sections';
import { User } from 'next-auth';
import { Resume } from '@/types';

interface AsideProps {
	sectionSelected: SectionControl | null;
	resumeId: string | null;
	user?: User;
	theme: Resume.theme;
}

const Aside = ({ sectionSelected, resumeId, user, theme }: AsideProps) => {
	return (
		<aside className='h-full flex'>
			<AsideSectionList
				sectionSelected={sectionSelected}
				resumeId={resumeId}
				user={user}
				theme={theme}
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
