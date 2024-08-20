'use client';

import ResumeExperienceForm, { ResumeExperienceFormValues } from '../../Forms/ResumeExperienceForm';
import { toast } from '../../ui/use-toast';
import { deleteExperienceAction } from '@/app/actions/resume/delete-experience';
import { updateExperienceAction } from '@/app/actions/resume/update-experience';
import { defaultResume } from '@/data/default-resume';
import { DefaultResumeExperience } from '@/data/default-resume.types';
import { isError, successResponse } from '@/lib/types';
import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeExperienceProps = {
	resumeId: string;
	userLogged?: User;
	resumeExperience: DefaultResumeExperience;
};

const ResumeExperience = ({ resumeId, userLogged, resumeExperience }: ResumeExperienceProps) => {
	const router = useRouter();
	const { updateExperience } = useResumeExperienceStore();

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
			<ResumeExperienceForm
				handleSubmit={handleSubmit}
				afterResumeExperienceFormSubmit={afterResumeExperienceFormSubmit}
				submitResponse={data}
				defaultValues={resumeExperience}
				handleDeleteSection={handleDeleteSection}
				resumeId={resumeId}
			/>
		</section>
	);
};

export default ResumeExperience;
