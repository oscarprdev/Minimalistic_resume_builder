'use client';

import ResumeEducationForm, { ResumeEducationFormValues } from '../../Forms/ResumeEducationForm';
import { toast } from '../../ui/use-toast';
import { deleteEducationAction } from '@/app/actions/resume/delete-education';
import { updateEducationAction } from '@/app/actions/resume/update-education';
import { defaultResume } from '@/data/default-resume';
import { DefaultResumeEducation } from '@/data/default-resume.types';
import { isError, successResponse } from '@/lib/types';
import { useResumeEducationStore } from '@/store/useResumeEducationStore';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeEducationProps = {
	resumeId: string;
	userLogged?: User;
	resumeEducation: DefaultResumeEducation;
};

const ResumeEducation = ({ resumeId, userLogged, resumeEducation }: ResumeEducationProps) => {
	const router = useRouter();
	const { updateEducation } = useResumeEducationStore();

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
			<ResumeEducationForm
				handleSubmit={handleSubmit}
				afterResumeEducationFormSubmit={afterResumeEducationFormSubmit}
				submitResponse={data}
				defaultValues={resumeEducation}
				handleDeleteSection={handleDeleteSection}
				resumeId={resumeId}
			/>
		</section>
	);
};

export default ResumeEducation;
