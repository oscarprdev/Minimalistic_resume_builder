'use client';

import ResumeEducationForm, { ResumeEducationFormValues } from '../../Forms/ResumeEducationForm';
import { toast } from '../../ui/use-toast';
import ResumeEducationSkeleton from './ResumeEducationSkeleton';
import { deleteEducationAction } from '@/app/actions/resume/delete-education';
import { describeEducationAction } from '@/app/actions/resume/describe-education';
import { updateEducationAction } from '@/app/actions/resume/update-education';
import { useDescribeSection } from '@/app/hooks/useDescribeSection';
import { defaultResume } from '@/data/default-resume';
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

	const response = useDescribeSection({
		resumeId,
		queryFn: async () => {
			if (!userLogged) {
				return successResponse(resumeEducation);
			}

			return await describeEducationAction(resumeId);
		},
	});

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

	const handleDeleteSection = async () => {
		if (!userLogged) {
			return updateEducation(defaultResume.education);
		}

		const response = await deleteEducationAction(resumeId);

		toast({
			variant: isError(response) ? 'destructive' : 'default',
			description: isError(response) ? response.error : response.success,
		});
	};

	return (
		<section data-testid="education">
			{response.isPending ? (
				<ResumeEducationSkeleton />
			) : response.data ? (
				<ResumeEducationForm
					handleSubmit={handleSubmit}
					afterResumeEducationFormSubmit={afterResumeEducationFormSubmit}
					submitResponse={data}
					defaultValues={response.data}
					handleDeleteSection={handleDeleteSection}
				/>
			) : (
				<p>error</p>
			)}
		</section>
	);
};

export default ResumeEducation;
