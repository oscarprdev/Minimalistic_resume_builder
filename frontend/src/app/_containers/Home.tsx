import { Suspense } from 'react';
import HomeTabs from '../_components/tabs/HomeTabs';
import Resume from './Resume';
import HomeTabsWrapper from '../_components/tabs/HomeTabsWrapper';
import { cn } from '@/lib/utils';

interface HomeProps {
	userId?: string;
	resumeSelected?: string;
}

const Home = async ({ userId, resumeSelected }: HomeProps) => {
	return (
		<main className={cn('bg-gray-100 w-screen h-screen', !userId && 'mt-10')}>
			{userId && (
				<HomeTabsWrapper>
					<Suspense fallback={<p>loading tabs</p>}>
						<HomeTabs
							userId={userId}
							resumeSelected={resumeSelected}
						/>
					</Suspense>
				</HomeTabsWrapper>
			)}
			<Resume
				userId={userId}
				resumeId={resumeSelected}
			/>
		</main>
	);
};

export default Home;
