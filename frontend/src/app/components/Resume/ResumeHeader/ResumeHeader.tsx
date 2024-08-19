'use client';

import ResumeHeaderForm, { ResumeHeaderFormValues } from '../../Forms/ResumeHeaderForm';
import { toast } from '../../ui/use-toast';
import { describeHeaderAction } from '@/app/actions/resume/describe-header';
import { updateHeaderAction } from '@/app/actions/resume/update-header';
import { useDescribeSection } from '@/app/hooks/useDescribeSection';
import { defaultResume } from '@/data/default-resume';
import { isError, successResponse } from '@/lib/types';
import { useResumeHeaderStore } from '@/store/useResumeHeaderStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ResumeHeaderProps = {
	resumeId: string;
	userLogged?: User;
};

const ResumeHeader = ({ resumeId, userLogged }: ResumeHeaderProps) => {
	const router = useRouter();
	const { resumeHeader, updateHeader } = useResumeHeaderStore();

	const response = useDescribeSection({
		resumeId,
		queryFn: async () => {
			if (!userLogged) {
				return successResponse(resumeHeader);
			}

			return await describeHeaderAction(resumeId);
		},
	});

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
			{!response.isPending && (
				<ResumeHeaderForm
					resumeId={resumeId}
					handleSubmit={handleSubmit}
					afterResumeHeaderFormSubmit={afterResumeHeaderFormSubmit}
					submitResponse={data}
					defaultValues={response.data ?? defaultResume.header}
				/>
			)}
		</section>
	);
};

export default ResumeHeader;
