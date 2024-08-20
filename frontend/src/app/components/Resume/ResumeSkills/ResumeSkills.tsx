'use client';

import ResumeSkillsForm, { ResumeSkillsFormValues } from '../../Forms/ResumeSkillsForm';
import { toast } from '../../ui/use-toast';
import { deleteSkillsAction } from '@/app/actions/resume/delete-skills';
import { updateSkillsAction } from '@/app/actions/resume/update-skills';
import { defaultResume } from '@/data/default-resume';
import { DefaultResumeSkills } from '@/data/default-resume.types';
import { isError, successResponse } from '@/lib/types';
import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeSkillsProps = {
	resumeId: string;
	userLogged?: User;
	resumeSkills: DefaultResumeSkills;
};

const ResumeSkills = ({ resumeId, userLogged, resumeSkills }: ResumeSkillsProps) => {
	const router = useRouter();
	const { updateSkills } = useResumeSkillsStore();

	const { mutate, data } = useMutation({
		mutationFn: async (values: ResumeSkillsFormValues) => {
			if (!userLogged) {
				updateSkills({ ...values });
				return successResponse('');
			}

			return await updateSkillsAction({ ...values, id: values.id || crypto.randomUUID().toString() }, resumeId);
		},
	});

	const handleSubmit = async (values: ResumeSkillsFormValues) => mutate(values);

	const afterResumeSkillsFormSubmit = () => {
		router.refresh();
	};

	const handleDeleteSection = async () => {
		if (!userLogged) {
			return updateSkills(defaultResume.skills);
		}

		const response = await deleteSkillsAction(resumeId);

		toast({
			variant: isError(response) ? 'destructive' : 'default',
			description: isError(response) ? response.error : response.success,
		});
	};

	return (
		<section data-testid="skills">
			<ResumeSkillsForm
				handleSubmit={handleSubmit}
				afterResumeSkillsFormSubmit={afterResumeSkillsFormSubmit}
				submitResponse={data}
				defaultValues={resumeSkills}
				handleDeleteSection={handleDeleteSection}
				resumeId={resumeId}
			/>
		</section>
	);
};

export default ResumeSkills;
