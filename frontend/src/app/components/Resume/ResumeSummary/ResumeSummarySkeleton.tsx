import React from 'react';

const ResumeSummarySkeleton = () => {
	return (
		<div className="flex flex-col animate-pulse items-start w-full gap-2">
			<div className="h-7 w-1/4 bg-zinc-200/50 rounded-md"></div>
			<div className="h-5 w-[80%] bg-zinc-200/50 rounded-md"></div>
			<div className="h-5 w-[80%] bg-zinc-200/50 rounded-md"></div>
			<div className="h-5 w-[40%] bg-zinc-200/50 rounded-md"></div>
		</div>
	);
};

export default ResumeSummarySkeleton;
