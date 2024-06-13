const ResumeListSkeleton = () => {
	return (
		<section className='flex flex-col items-center gap-2 border border-gray-200 shadow-sm py-5 px-1 bg-white'>
			<div className='bg-gray-100 w-[200px] p-3 animate-pulse' />
			<div className='bg-gray-100 w-full min-w-[500px] p-6 animate-pulse' />
			<div className='bg-gray-100 w-full min-w-[500px] p-6 animate-pulse' />
			<div className='bg-gray-100 w-full min-w-[500px] p-6 animate-pulse' />
			<div className='bg-gray-100 w-full min-w-[500px] p-6 animate-pulse' />
			<div className='bg-gray-100 w-full min-w-[500px] p-6 animate-pulse' />
		</section>
	);
};

export default ResumeListSkeleton;
