'use client';

import ResumeSummaryForm, { ResumeSummaryFormValues } from '../../Forms/ResumeSummaryForm';
import { toast } from '../../ui/use-toast';
import { deleteSummaryAction } from '@/app/actions/resume/delete-summary';
import { describeSummaryAction } from '@/app/actions/resume/describe-summary';
import { updateSummaryAction } from '@/app/actions/resume/update-summary';
import { defaultResume } from '@/data/default-resume';
import { isError, successResponse } from '@/lib/types';
import { useResumeSummaryStore } from '@/store/useResumeSummaryStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeSummaryProps = {
	resumeId: string;
	userLogged?: User;
};

const ResumeSummary = ({ resumeId, userLogged }: ResumeSummaryProps) => {
	const router = useRouter();
	const { resumeSummary, updateSummary } = useResumeSummaryStore();
	const queryResumeSummary = useQuery({
		queryKey: ['resumeSummary', resumeId],
		queryFn: async () => {
			if (!userLogged) {
				return successResponse(resumeSummary);
			}

			return await describeSummaryAction(resumeId);
		},
	});

	if (queryResumeSummary.data && isError(queryResumeSummary.data)) {
		toast({
			variant: 'destructive',
			description: queryResumeSummary.data.error,
		});
	}

	const { mutate, data } = useMutation({
		mutationFn: async (values: ResumeSummaryFormValues) => {
			if (!userLogged) {
				updateSummary({ ...values });
				return successResponse('');
			}

			return await updateSummaryAction({ ...values, id: values.id || crypto.randomUUID().toString() }, resumeId);
		},
	});

	const handleSubmit = async (values: ResumeSummaryFormValues) => mutate(values);

	const afterResumeSummaryFormSubmit = () => {
		router.refresh();
	};

	const handleDeleteSection = async () => {
		if (!userLogged) {
			return updateSummary(defaultResume.summary);
		}

		const response = await deleteSummaryAction(resumeId);

		toast({
			variant: isError(response) ? 'destructive' : 'default',
			description: isError(response) ? response.error : response.success,
		});
	};

	return (
		<section>
			{!queryResumeSummary.isPending && queryResumeSummary.data && !isError(queryResumeSummary.data) && (
				<ResumeSummaryForm
					handleSubmit={handleSubmit}
					afterResumeSummaryFormSubmit={afterResumeSummaryFormSubmit}
					submitResponse={data}
					defaultValues={queryResumeSummary.data.success}
					handleDeleteSection={handleDeleteSection}
				/>
			)}
		</section>
	);
};

export default ResumeSummary;
