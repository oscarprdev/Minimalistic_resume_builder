import React from 'react';

const ViewerEducationSkeleton = () => {
	return (
		<section className='relative w-full flex flex-col gap-2 px-5 py-3'>
			<div className='w-[25%] h-7 bg-gray-200 animate-pulse'></div>
			<div className='flex flex-col gap-1 ml-6 mt-2'>
				<div className='w-[65%] h-5 bg-gray-200 animate-pulse'></div>
				<div className='flex items-center gap-2'>
					<div className='w-[20%] h-4 bg-gray-200 animate-pulse'></div>
					<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
					<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
				</div>
			</div>
			<div className='flex flex-col gap-1 ml-6 mt-2'>
				<div className='w-[65%] h-5 bg-gray-200 animate-pulse'></div>
				<div className='flex items-center gap-2'>
					<div className='w-[20%] h-4 bg-gray-200 animate-pulse'></div>
					<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
					<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
				</div>
			</div>
		</section>
	);
};

export default ViewerEducationSkeleton;
