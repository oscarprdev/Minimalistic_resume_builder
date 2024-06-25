'use server';

import { Suspense } from 'react';
import ResumeList from './components/ResumeList/ResumeList';
import CreateNewResumeCta from './components/CreateNewResumeCta';
import ResumeListSkeleton from './components/ResumeList/ResumeListSkeleton';
import { WithAuthorization } from '@/components/wrappers/WithAuthorization';

export default async function HomePage() {
	return (
		<main className='flex flex-col items-center gap-5 p-10'>
			<CreateNewResumeCta />
			<WithAuthorization>
				<Suspense fallback={<ResumeListSkeleton />}>
					<ResumeList />
				</Suspense>
			</WithAuthorization>
		</main>
	);
}
