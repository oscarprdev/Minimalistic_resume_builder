import React from 'react';

const ResumeEducationSkeleton = () => {
	return (
		<div className="flex flex-col animate-pulse items-start w-full gap-4">
			<div className="h-7 w-1/3 bg-zinc-200/50 rounded-md"></div>
			<div className="flex flex-col items-start w-full gap-2">
				<div className="flex items-center justify-between w-full">
					<div className="h-5 w-1/4 bg-zinc-200/50 rounded-md"></div>
					<div className="h-5 w-1/5 bg-zinc-200/50 rounded-md"></div>
				</div>
				<div className="h-5 w-1/5 bg-zinc-200/50 rounded-md"></div>
			</div>
			<div className="flex flex-col items-start w-full gap-2">
				<div className="flex items-center justify-between w-full">
					<div className="h-5 w-1/4 bg-zinc-200/50 rounded-md"></div>
					<div className="h-5 w-1/5 bg-zinc-200/50 rounded-md"></div>
				</div>
				<div className="h-5 w-1/5 bg-zinc-200/50 rounded-md"></div>
			</div>
		</div>
	);
};

export default ResumeEducationSkeleton;
