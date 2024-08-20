import React from 'react';

const ResumeSkillsSkeleton = () => {
	return (
		<div className="flex flex-col animate-pulse items-start w-full gap-2">
			<div className="h-7 w-1/4 bg-zinc-200/50 rounded-md"></div>
			<div className="flex items-center w-full gap-2">
				<div className="h-7 w-1/6 bg-zinc-200/50 rounded-md"></div>
				<div className="h-7 w-1/6 bg-zinc-200/50 rounded-md"></div>
				<div className="h-7 w-1/6 bg-zinc-200/50 rounded-md"></div>
				<div className="h-7 w-1/6 bg-zinc-200/50 rounded-md"></div>
				<div className="h-7 w-1/6 bg-zinc-200/50 rounded-md"></div>
			</div>
		</div>
	);
};

export default ResumeSkillsSkeleton;
