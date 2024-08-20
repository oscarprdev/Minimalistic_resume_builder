import React, { ReactNode } from 'react';

const MainHome = ({ children }: { children: ReactNode }) => (
	<main id="resume" className="w-screen py-16 px-5 sm:p-16 m-auto">
		{children}
	</main>
);

export default MainHome;
