'use client';

import ResumeEducationForm, { ResumeEducationFormValues } from '../../Forms/ResumeEducationForm';
import { toast } from '../../ui/use-toast';
import { describeEducationAction } from '@/app/actions/resume/describe-education';
import { updateEducationAction } from '@/app/actions/resume/update-education';
import { isError, successResponse } from '@/lib/types';
import { useResumeEducationStore } from '@/store/useResumeEducationStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeEducationProps = {
	resumeId: string;
	userLogged?: User;
};

const ResumeEducation = ({ resumeId, userLogged }: ResumeEducationProps) => {
	const router = useRouter();
	const { resumeEducation, updateEducation } = useResumeEducationStore();
	const queryResumeEducation = useQuery({
		queryKey: ['resumeEducation'],
		queryFn: async () => {
			if (!userLogged) {
				return successResponse(resumeEducation);
			}

			return await describeEducationAction(resumeId);
		},
	});

	if (queryResumeEducation.data && isError(queryResumeEducation.data)) {
		toast({
			variant: 'destructive',
			description: queryResumeEducation.data.error,
		});
	}

	const { mutate, data } = useMutation({
		mutationFn: async (values: ResumeEducationFormValues) => {
			if (!userLogged) {
				updateEducation({ ...values });
				return successResponse('');
			}

			return await updateEducationAction(
				{ ...values, id: values.id || crypto.randomUUID().toString() },
				resumeId
			);
		},
	});

	const handleSubmit = async (values: ResumeEducationFormValues) => mutate(values);

	const afterResumeEducationFormSubmit = () => {
		router.refresh();
	};

	return (
		<section>
			{!queryResumeEducation.isPending && queryResumeEducation.data && !isError(queryResumeEducation.data) && (
				<ResumeEducationForm
					handleSubmit={handleSubmit}
					afterResumeEducationFormSubmit={afterResumeEducationFormSubmit}
					submitResponse={data}
					defaultValues={queryResumeEducation.data.success}
				/>
			)}
		</section>
	);
};

export default ResumeEducation;
