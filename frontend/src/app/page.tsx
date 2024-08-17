import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
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
			<Suspense fallback={<p>Loading...</p>}>
				<HomeScreen resumeId={id} />
			</Suspense>
		</>
	);
}
