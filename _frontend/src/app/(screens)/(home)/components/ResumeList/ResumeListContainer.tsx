import { ReactNode } from 'react';

const ResumeListContainer = ({ children }: { children: ReactNode }) => {
	return (
		<section className='flex flex-col items-center border border-gray-200 shadow-sm py-5 px-1 bg-white w-[90%]'>
			<p className='text-sm text-gray-500 pb-5'>Your current resumes</p>
			{children}
		</section>
	);
};

export default ResumeListContainer;
