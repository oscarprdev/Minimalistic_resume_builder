'use client';

import { toast } from '../ui/use-toast';
import { createResumeAction } from '@/app/actions/resume/create-resume';
import { setResumeId } from '@/app/actions/resume/set-resume-id';
import { updateHeaderAction } from '@/app/actions/resume/update-header';
import { defaultResume } from '@/data/default-resume';
import { isError } from '@/lib/types';
import { IconPencilPlus } from '@tabler/icons-react';
import React, { Ref, forwardRef, useImperativeHandle } from 'react';

export type NewResumeButtonRef = {
	handleNewResume(): Promise<void>;
};

const NewResumeButton = ({}, ref: Ref<NewResumeButtonRef>) => {
	const handleNewResume = async () => {
		const resumeId = crypto.randomUUID().toString();
		const response = await createResumeAction(resumeId);

		if (isError(response)) {
			toast({
				variant: 'destructive',
				description: response.error,
			});
			return;
		}

		const createDefaultHeaderResponse = await updateHeaderAction(
			{ ...defaultResume.header, id: crypto.randomUUID().toString() },
			resumeId
		);
		if (isError(createDefaultHeaderResponse)) {
			toast({
				variant: 'destructive',
				description: createDefaultHeaderResponse.error,
			});
			return;
		}

		setResumeId(resumeId);
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
