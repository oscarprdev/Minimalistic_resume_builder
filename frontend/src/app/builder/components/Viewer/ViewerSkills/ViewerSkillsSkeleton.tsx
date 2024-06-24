import React from 'react';

const ViewerSkillsSkeleton = () => {
	return (
		<section className='relative w-full flex flex-col gap-2 px-5 py-3'>
			<div className='w-[25%] h-7 bg-gray-200 animate-pulse'></div>
			<div className='flex items-center gap-2 mt-3'>
				<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
				<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
				<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
				<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
				<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
				<div className='w-[10%] h-4 bg-gray-200 animate-pulse'></div>
			</div>
		</section>
	);
};

export default ViewerSkillsSkeleton;
