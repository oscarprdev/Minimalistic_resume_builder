'use server';

import { ReactNode } from 'react';

const HomeTabsWrapper = ({ children }: { children: ReactNode }) => {
	return <div className='w-screen py-5 px-10 grid place-items-center bg-gray-100'>{children}</div>;
};

export default HomeTabsWrapper;
