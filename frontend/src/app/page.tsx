import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { IconLoader2 } from '@tabler/icons-react';
import { Suspense } from 'react';

type HomeProps = {
	searchParams: {
		id: string;
	};
};

export default async function Home({ searchParams: { id } }: HomeProps) {
	return (
		<>
			<Header resumeId={id} />
			<Suspense
				fallback={
					<section>
						<IconLoader2 className="animate-spin" size={20} />
					</section>
				}>
				<HomeScreen resumeId={id} />
			</Suspense>
		</>
	);
}
