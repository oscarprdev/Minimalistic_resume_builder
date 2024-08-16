const ViewerHeaderSkeleton = () => {
	return (
		<section className='relative w-full flex flex-col gap-2 px-5 py-3'>
			<div className='w-[50%] h-7 bg-gray-200 animate-pulse'></div>
			<div className='w-[60%] h-7 bg-gray-200 animate-pulse'></div>
			<div className='flex items-center gap-2 mt-5'>
				<div className='w-[20%] h-4 bg-gray-200 animate-pulse'></div>
				<div className='w-[20%] h-4 bg-gray-200 animate-pulse'></div>
				<div className='w-[20%] h-4 bg-gray-200 animate-pulse'></div>
			</div>
			<div className='w-[30%] h-4 bg-gray-200 animate-pulse'></div>
			<div className='w-[30%] h-4 bg-gray-200 animate-pulse'></div>
			<div className='w-[100px] h-[100px] bg-gray-200 animate-pulse absolute top-8 right-8'></div>
		</section>
	);
};

export default ViewerHeaderSkeleton;
