'use client';

import ResumeLanguagesForm, { ResumeLanguagesFormValues } from '../../Forms/ResumeLanguagesForm';
import { toast } from '../../ui/use-toast';
import { deleteLanguagesAction } from '@/app/actions/resume/delete-languages';
import { updateLanguagesAction } from '@/app/actions/resume/update-languages';
import { defaultResume } from '@/data/default-resume';
import { DefaultResumeLanguages } from '@/data/default-resume.types';
import { isError, successResponse } from '@/lib/types';
import { useResumeLanguageStore } from '@/store/useResumeLanguageStore';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeLanguageProps = {
	resumeId: string;
	userLogged?: User;
	resumeLanguages: DefaultResumeLanguages;
};

const ResumeLanguage = ({ resumeId, userLogged, resumeLanguages }: ResumeLanguageProps) => {
	const router = useRouter();
	const { updateLanguage } = useResumeLanguageStore();

	const { mutate, data } = useMutation({
		mutationFn: async (values: ResumeLanguagesFormValues) => {
			if (!userLogged) {
				updateLanguage({ ...values });
				return successResponse('');
			}

			return await updateLanguagesAction(
				{ ...values, id: values.id || crypto.randomUUID().toString() },
				resumeId
			);
		},
	});

	const handleSubmit = async (values: ResumeLanguagesFormValues) => mutate(values);

	const afterResumeLanguageFormSubmit = () => {
		router.refresh();
	};

	const handleDeleteSection = async () => {
		if (!userLogged) {
			return updateLanguage(defaultResume.languages);
		}

		const response = await deleteLanguagesAction(resumeId);

		toast({
			variant: isError(response) ? 'destructive' : 'default',
			description: isError(response) ? response.error : response.success,
		});
	};

	return (
		<section data-testid="languages">
			<ResumeLanguagesForm
				handleSubmit={handleSubmit}
				afterResumeLanguagesFormSubmit={afterResumeLanguageFormSubmit}
				submitResponse={data}
				defaultValues={resumeLanguages}
				handleDeleteSection={handleDeleteSection}
				resumeId={resumeId}
			/>
		</section>
	);
};

export default ResumeLanguage;
