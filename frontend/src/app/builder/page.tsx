'use server';

import Aside from './components/Aside/Aside';
import Viewer from './components/Viewer/Viewer';
import { SectionControl } from './components/_utils/sections';

export interface HomeProps {
	searchParams: { resume?: string; selected?: string };
}

export default async function BuilderPage({ searchParams }: HomeProps) {
	let resumeSelected = searchParams.resume || null;
	let sectionSelected = (searchParams.selected as SectionControl) || null;

	return (
		<main className='flex items-start w-screen'>
			<Aside
				sectionSelected={sectionSelected}
				resumeId={resumeSelected}
			/>
			<Viewer resumeId={resumeSelected} />
		</main>
	);
}
