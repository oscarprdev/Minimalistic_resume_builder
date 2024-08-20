'use client';

import ResumeSkillsForm, { ResumeSkillsFormValues } from '../../Forms/ResumeSkillsForm';
import { toast } from '../../ui/use-toast';
import ResumeSkillsSkeleton from './ResumeSkillsSkeleton';
import { deleteSkillsAction } from '@/app/actions/resume/delete-skills';
import { describeSkillsAction } from '@/app/actions/resume/describe-skills';
import { updateSkillsAction } from '@/app/actions/resume/update-skills';
import { useDescribeSection } from '@/app/hooks/useDescribeSection';
import { defaultResume } from '@/data/default-resume';
import { isError, successResponse } from '@/lib/types';
import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeSkillsProps = {
	resumeId: string;
	userLogged?: User;
};

const ResumeSkills = ({ resumeId, userLogged }: ResumeSkillsProps) => {
	const router = useRouter();
	const { resumeSkills, updateSkills } = useResumeSkillsStore();

	const response = useDescribeSection({
		resumeId,
		queryFn: async () => {
			if (!userLogged) {
				return successResponse(resumeSkills);
			}

			return await describeSkillsAction(resumeId);
		},
	});

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
			{response.isPending ? (
				<ResumeSkillsSkeleton />
			) : response.data ? (
				<ResumeSkillsForm
					handleSubmit={handleSubmit}
					afterResumeSkillsFormSubmit={afterResumeSkillsFormSubmit}
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

export default ResumeSkills;
