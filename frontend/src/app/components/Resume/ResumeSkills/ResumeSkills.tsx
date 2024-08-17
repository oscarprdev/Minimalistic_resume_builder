'use client';

import ResumeSkillsForm, { ResumeSkillsFormValues } from '../../Forms/ResumeSkillsForm';
import { toast } from '../../ui/use-toast';
import { describeSkillsAction } from '@/app/actions/resume/describe-skills';
import { updateSkillsAction } from '@/app/actions/resume/update-skills';
import { isError, successResponse } from '@/lib/types';
import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeSkillsProps = {
	resumeId: string;
	userLogged?: User;
};

const ResumeSkills = ({ resumeId, userLogged }: ResumeSkillsProps) => {
	const router = useRouter();
	const { resumeSkills, updateSkills } = useResumeSkillsStore();
	const queryResumeSkills = useQuery({
		queryKey: ['resumeSkills', resumeId],
		queryFn: async () => {
			if (!userLogged) {
				return successResponse(resumeSkills);
			}

			return await describeSkillsAction(resumeId);
		},
	});

	if (queryResumeSkills.data && isError(queryResumeSkills.data)) {
		toast({
			variant: 'destructive',
			description: queryResumeSkills.data.error,
		});
	}

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

	return (
		<section>
			{!queryResumeSkills.isPending && queryResumeSkills.data && !isError(queryResumeSkills.data) && (
				<ResumeSkillsForm
					handleSubmit={handleSubmit}
					afterResumeSkillsFormSubmit={afterResumeSkillsFormSubmit}
					submitResponse={data}
					defaultValues={queryResumeSkills.data.success}
				/>
			)}
		</section>
	);
};

export default ResumeSkills;
