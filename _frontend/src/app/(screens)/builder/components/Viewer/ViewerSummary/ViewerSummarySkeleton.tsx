import React from 'react';

const ViewerSummarySkeleton = () => {
	return (
		<section className='relative w-full flex flex-col gap-2 px-5 py-3'>
			<div className='w-[25%] h-7 bg-gray-200 animate-pulse'></div>
			<div className='w-full h-4 bg-gray-200 animate-pulse'></div>
			<div className='w-full h-4 bg-gray-200 animate-pulse'></div>
			<div className='w-[80%] h-4 bg-gray-200 animate-pulse'></div>
		</section>
	);
};

export default ViewerSummarySkeleton;
