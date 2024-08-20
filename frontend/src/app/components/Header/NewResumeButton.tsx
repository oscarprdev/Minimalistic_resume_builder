'use client';

import { toast } from '../ui/use-toast';
import { createResumeAction } from '@/app/actions/resume/create-resume';
import { setResumeId } from '@/app/actions/resume/set-resume-id';
import { isError } from '@/lib/types';
import { IconPencilPlus } from '@tabler/icons-react';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import React, { Ref, forwardRef, useImperativeHandle } from 'react';

export type NewResumeButtonRef = {
	handleNewResume(): Promise<void>;
};

const NewResumeButton = ({}, ref: Ref<NewResumeButtonRef>) => {
	const router = useRouter();

	const handleNewResume = async () => {
		const resumeId = crypto.randomUUID().toString();
		const response = await createResumeAction(resumeId);

		isError(response)
			? toast({
					variant: 'destructive',
					description: response.error,
				})
			: setResumeId(resumeId);
	};

	useImperativeHandle(ref, () => ({
		handleNewResume,
	}));

	return (
		<div className="flex items-center gap-2 ">
			<IconPencilPlus size={16} />
			<p className="text-xs ">New resume</p>
		</div>
	);
};

export default forwardRef(NewResumeButton);
