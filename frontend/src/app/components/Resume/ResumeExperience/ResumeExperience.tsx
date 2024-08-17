'use client';

import ResumeExperienceForm, { ResumeExperienceFormValues } from '../../Forms/ResumeExperienceForm';
import { toast } from '../../ui/use-toast';
import { describeExperienceAction } from '@/app/actions/resume/describe-experience';
import { updateExperienceAction } from '@/app/actions/resume/update-experience';
import { isError, successResponse } from '@/lib/types';
import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeExperienceProps = {
	resumeId: string;
	userLogged?: User;
};

const ResumeExperience = ({ resumeId, userLogged }: ResumeExperienceProps) => {
	const router = useRouter();
	const { resumeExperience, updateExperience } = useResumeExperienceStore();
	const queryResumeExperience = useQuery({
		queryKey: ['resumeExperience'],
		queryFn: async () => {
			if (!userLogged) {
				return successResponse(resumeExperience);
			}

			return await describeExperienceAction(resumeId);
		},
	});

	if (queryResumeExperience.data && isError(queryResumeExperience.data)) {
		toast({
			variant: 'destructive',
			description: queryResumeExperience.data.error,
		});
	}

	const { mutate, data } = useMutation({
		mutationFn: async (values: ResumeExperienceFormValues) => {
			if (!userLogged) {
				updateExperience({ ...values });
				return successResponse('');
			}

			return await updateExperienceAction(
				{ ...values, id: values.id || crypto.randomUUID().toString() },
				resumeId
			);
		},
	});

	const handleSubmit = async (values: ResumeExperienceFormValues) => mutate(values);

	const afterResumeExperienceFormSubmit = () => {
		router.refresh();
	};

	return (
		<section>
			{!queryResumeExperience.isPending && queryResumeExperience.data && !isError(queryResumeExperience.data) && (
				<ResumeExperienceForm
					handleSubmit={handleSubmit}
					afterResumeExperienceFormSubmit={afterResumeExperienceFormSubmit}
					submitResponse={data}
					defaultValues={queryResumeExperience.data.success}
				/>
			)}
		</section>
	);
};

export default ResumeExperience;
