const AsideFormEducationSkeleton = () => {
	return (
		<div className='flex flex-col w-full gap-6'>
			<div className='flex flex-col gap-2'>
				<div className='w-[25%] h-5 bg-gray-200 animate-pulse'></div>
				<div className='w-full h-8 bg-gray-200 animate-pulse'></div>
			</div>
			<div className='flex flex-col gap-2 mt-5'>
				<div className='w-[25%] h-5 bg-gray-200 animate-pulse'></div>
				<div className='w-full h-8 bg-gray-200 animate-pulse'></div>
			</div>
			<div className='flex items-center gap-2'>
				<div className='flex flex-col gap-2 w-full'>
					<div className='w-1/2 h-5 bg-gray-200 animate-pulse'></div>
					<div className='w-full h-8 bg-gray-200 animate-pulse'></div>
				</div>
				<div className='flex flex-col gap-2 w-full'>
					<div className='w-1/2 h-5 bg-gray-200 animate-pulse'></div>
					<div className='w-full h-8 bg-gray-200 animate-pulse'></div>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='w-[25%] h-5 bg-gray-200 animate-pulse'></div>
				<div className='w-full h-8 bg-gray-200 animate-pulse'></div>
			</div>
			<div className='w-full h-10 bg-gray-200 animate-pulse'></div>
			<div className='w-full h-10 bg-gray-200 animate-pulse'></div>
		</div>
	);
};

export default AsideFormEducationSkeleton;
