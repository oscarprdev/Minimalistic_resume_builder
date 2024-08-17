import HomeScreen from './screens/HomeScreen/HomeScreen';
import { Suspense } from 'react';

export default async function Home() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<HomeScreen />
		</Suspense>
	);
}
