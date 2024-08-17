'use client';

import ResumeLanguagesForm, { ResumeLanguagesFormValues } from '../../Forms/ResumeLanguagesForm';
import { toast } from '../../ui/use-toast';
import { describeLanguagesAction } from '@/app/actions/resume/describe-languages';
import { updateLanguagesAction } from '@/app/actions/resume/update-languages';
import { isError, successResponse } from '@/lib/types';
import { useResumeLanguageStore } from '@/store/useResumeLanguageStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeLanguageProps = {
	resumeId: string;
	userLogged?: User;
};

const ResumeLanguage = ({ resumeId, userLogged }: ResumeLanguageProps) => {
	const router = useRouter();
	const { resumeLanguage, updateLanguage } = useResumeLanguageStore();
	const queryResumeLanguage = useQuery({
		queryKey: ['resumeLanguage'],
		queryFn: async () => {
			if (!userLogged) {
				return successResponse(resumeLanguage);
			}

			return await describeLanguagesAction(resumeId);
		},
	});

	if (queryResumeLanguage.data && isError(queryResumeLanguage.data)) {
		toast({
			variant: 'destructive',
			description: queryResumeLanguage.data.error,
		});
	}

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

	return (
		<section>
			{!queryResumeLanguage.isPending && queryResumeLanguage.data && !isError(queryResumeLanguage.data) && (
				<ResumeLanguagesForm
					handleSubmit={handleSubmit}
					afterResumeLanguagesFormSubmit={afterResumeLanguageFormSubmit}
					submitResponse={data}
					defaultValues={queryResumeLanguage.data.success}
				/>
			)}
		</section>
	);
};

export default ResumeLanguage;
