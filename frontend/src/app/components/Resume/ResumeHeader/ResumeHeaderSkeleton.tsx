import React from 'react';

const ResumeHeaderSkeleton = () => {
	return (
		<div className="flex flex-col animate-pulse items-start w-full gap-2">
			<div className="h-7 w-1/3 bg-zinc-200/50 rounded-md"></div>
			<div className="h-5 w-[80%] bg-zinc-200/50 rounded-md"></div>
			<div className="h-5 w-[70%] bg-zinc-200/50 rounded-md"></div>
			<div className="flex items-center w-full gap-2">
				<div className="h-5 w-[20%] bg-zinc-200/50 rounded-md"></div>
				<div className="h-5 w-[20%] bg-zinc-200/50 rounded-md"></div>
				<div className="h-5 w-[20%] bg-zinc-200/50 rounded-md"></div>
			</div>
			<div className="h-5 w-[50%] bg-zinc-200/50 rounded-md"></div>
		</div>
	);
};

export default ResumeHeaderSkeleton;
