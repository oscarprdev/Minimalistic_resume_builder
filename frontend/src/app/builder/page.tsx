'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import Aside from './components/Aside/Aside';
import Viewer from './components/Viewer/Viewer';
import { SectionControl } from './components/_utils/sections';

export interface HomeProps {
	searchParams: { resume?: string; selected?: string };
}

export default async function BuilderPage({ searchParams }: HomeProps) {
	let resumeSelected = searchParams.resume || null;
	let sectionSelected = (searchParams.selected as SectionControl) || null;

	const user = await useUserLogged();

	return (
		<main className='flex items-start w-screen h-full'>
			<Aside
				sectionSelected={sectionSelected}
				resumeId={resumeSelected}
				user={user}
			/>
			<Viewer
				resumeId={resumeSelected}
				user={user}
			/>
		</main>
	);
}
