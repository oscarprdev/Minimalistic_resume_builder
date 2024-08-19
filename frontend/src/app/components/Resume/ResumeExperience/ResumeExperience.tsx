'use client';

import ResumeExperienceForm, { ResumeExperienceFormValues } from '../../Forms/ResumeExperienceForm';
import { toast } from '../../ui/use-toast';
import ResumeExperienceSkeleton from './ResumeExperienceSkeleton';
import { deleteExperienceAction } from '@/app/actions/resume/delete-experience';
import { describeExperienceAction } from '@/app/actions/resume/describe-experience';
import { updateExperienceAction } from '@/app/actions/resume/update-experience';
import { useDescribeSection } from '@/app/hooks/useDescribeSection';
import { defaultResume } from '@/data/default-resume';
import { isError, successResponse } from '@/lib/types';
import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeExperienceProps = {
	resumeId: string;
	userLogged?: User;
};

const ResumeExperience = ({ resumeId, userLogged }: ResumeExperienceProps) => {
	const router = useRouter();
	const { resumeExperience, updateExperience } = useResumeExperienceStore();

	const response = useDescribeSection({
		resumeId,
		queryFn: async () => {
			if (!userLogged) {
				return successResponse(resumeExperience);
			}

			return await describeExperienceAction(resumeId);
		},
	});

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

	const handleDeleteSection = async () => {
		if (!userLogged) {
			return updateExperience(defaultResume.experience);
		}

		const response = await deleteExperienceAction(resumeId);

		toast({
			variant: isError(response) ? 'destructive' : 'default',
			description: isError(response) ? response.error : response.success,
		});
	};

	return (
		<section data-testid="experience">
			{!response.isPending && response.data ? (
				<ResumeExperienceForm
					handleSubmit={handleSubmit}
					afterResumeExperienceFormSubmit={afterResumeExperienceFormSubmit}
					submitResponse={data}
					defaultValues={response.data}
					handleDeleteSection={handleDeleteSection}
				/>
			) : (
				<ResumeExperienceSkeleton />
			)}
		</section>
	);
};

export default ResumeExperience;
