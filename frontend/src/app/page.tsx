'use server';

import Home from './_containers/Home';

export interface HomeProps {
	searchParams: { user?: string; resume?: string };
}

export default async function HomePage({ searchParams }: HomeProps) {
	const userId = searchParams.user;
	const resumeId = searchParams.resume;

	return (
		<Home
			userId={userId}
			resumeSelected={resumeId}
		/>
	);
}
