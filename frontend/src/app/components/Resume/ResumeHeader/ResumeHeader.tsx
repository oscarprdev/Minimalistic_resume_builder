'use client';

import ResumeHeaderForm, { ResumeHeaderFormValues } from '../../Forms/ResumeHeaderForm';
import { updateHeaderAction } from '@/app/actions/resume/update-header';
import { DefaultResumeHeader } from '@/data/default-resume.types';
import { successResponse } from '@/lib/types';
import { useResumeHeaderStore } from '@/store/useResumeHeaderStore';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ResumeHeaderProps = {
	resumeId: string;
	userLogged?: User;
	resumeHeader: DefaultResumeHeader;
};

const ResumeHeader = ({ resumeId, userLogged, resumeHeader }: ResumeHeaderProps) => {
	const router = useRouter();

	const { updateHeader } = useResumeHeaderStore();

	const { mutate, data } = useMutation({
		mutationFn: async (values: ResumeHeaderFormValues) => {
			if (!userLogged) {
				updateHeader({ ...values });
				return successResponse('');
			}

			return await updateHeaderAction({ ...values, id: values.id || crypto.randomUUID().toString() }, resumeId);
		},
	});

	const handleSubmit = async (values: ResumeHeaderFormValues) => mutate(values);

	const afterResumeHeaderFormSubmit = () => {
		router.refresh();
	};

	return (
		<section data-testid="header">
			<ResumeHeaderForm
				resumeId={resumeId}
				handleSubmit={handleSubmit}
				afterResumeHeaderFormSubmit={afterResumeHeaderFormSubmit}
				submitResponse={data}
				defaultValues={resumeHeader}
			/>
		</section>
	);
};

export default ResumeHeader;
