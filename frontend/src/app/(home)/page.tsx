'use server';

import { Suspense } from 'react';
import ResumeList from './components/ResumeList/ResumeList';
import CreateNewResumeCta from './components/CreateNewResumeCta';
import { WithAuthorization } from '../_containers/WithAuthorization';
import ResumeListSkeleton from './components/ResumeList/ResumeListSkeleton';

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
