'use server';

import { Suspense } from 'react';
import HomeTabs from '../_components/tabs/HomeTabs';
import Resume from './Resume';

interface HomeProps {
	userId: string;
	resumeSelected?: string;
}

const Home = async ({ userId, resumeSelected }: HomeProps) => {
	return (
		<main>
			<Suspense fallback={<p>loading tabs</p>}>
				<HomeTabs
					userId={userId}
					resumeSelected={resumeSelected}
				/>
			</Suspense>
			<Resume
				userId={userId}
				resumeId={resumeSelected}
			/>
		</main>
	);
};

export default Home;
