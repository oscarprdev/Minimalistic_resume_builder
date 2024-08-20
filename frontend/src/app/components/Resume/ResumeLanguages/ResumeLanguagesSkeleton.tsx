import React from 'react';

const ResumeLanguagesSkeleton = () => {
	return (
		<div className="flex flex-col animate-pulse items-start w-full gap-2">
			<div className="h-7 w-1/4 bg-zinc-200/50 rounded-md"></div>
			<div className="flex items-center w-full gap-2">
				<div className="flex flex-col gap-1 w-1/6">
					<div className="h-5 w-full bg-zinc-200/50 rounded-md"></div>
					<div className="h-5 w-1/2 bg-zinc-200/50 rounded-md"></div>
				</div>
				<div className="flex flex-col gap-1 w-1/6">
					<div className="h-5 w-full bg-zinc-200/50 rounded-md"></div>
					<div className="h-5 w-1/2 bg-zinc-200/50 rounded-md"></div>
				</div>
				<div className="flex flex-col gap-1 w-1/6">
					<div className="h-5 w-full bg-zinc-200/50 rounded-md"></div>
					<div className="h-5 w-1/2 bg-zinc-200/50 rounded-md"></div>
				</div>
			</div>
		</div>
	);
};

export default ResumeLanguagesSkeleton;
