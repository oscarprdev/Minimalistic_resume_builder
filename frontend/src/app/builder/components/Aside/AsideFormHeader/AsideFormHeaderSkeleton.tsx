const AsideFormHeaderSkeleton = () => {
	return (
		<div className='flex flex-col w-full gap-6'>
			<div className='flex flex-col items-start gap-2'>
				<div className='w-[140px] h-[140px] bg-gray-200 animate-pulse'></div>
				<div className='w-[140px] h-10 bg-gray-200 animate-pulse'></div>
				<div className='w-[140px] h-10 bg-gray-200 animate-pulse'></div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='w-[25%] h-5 bg-gray-200 animate-pulse'></div>
				<div className='w-full h-8 bg-gray-200 animate-pulse'></div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='w-[25%] h-5 bg-gray-200 animate-pulse'></div>
				<div className='w-full h-20 bg-gray-200 animate-pulse'></div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='w-[25%] h-5 bg-gray-200 animate-pulse'></div>
				<div className='w-full h-8 bg-gray-200 animate-pulse'></div>
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

export default AsideFormHeaderSkeleton;
