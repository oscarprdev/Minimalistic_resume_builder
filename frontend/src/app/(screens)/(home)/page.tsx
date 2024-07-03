'use server';

import { Suspense } from 'react';
import ResumeList from './components/ResumeList/ResumeList';
import CreateNewResumeCta from './components/CreateNewResumeCta';
import ResumeListSkeleton from './components/ResumeList/ResumeListSkeleton';
import { WithAuthorization } from '@/components/wrappers/WithAuthorization';
import { useUserLogged } from '@/hooks/useUserLogged';
import ResumeLandingSection from './components/ResumeList/ResumeLandingSection';

export default async function HomePage() {
	const user = await useUserLogged();

	return (
		<main className='flex flex-col items-center gap-5 p-10 w-screen h-screen overflow-auto'>
			<div className='flex flex-col items-center gap-10'>
				{!user && <ResumeLandingSection />}
				<CreateNewResumeCta />
			</div>
			<WithAuthorization>
				<Suspense fallback={<ResumeListSkeleton />}>
					<ResumeList />
				</Suspense>
			</WithAuthorization>
		</main>
	);
}
