'use client';

import ResumeSummaryForm, { ResumeSummaryFormValues } from '../../Forms/ResumeSummaryForm';
import { toast } from '../../ui/use-toast';
import { deleteSummaryAction } from '@/app/actions/resume/delete-summary';
import { updateSummaryAction } from '@/app/actions/resume/update-summary';
import { defaultResume } from '@/data/default-resume';
import { DefaultResumeSummary } from '@/data/default-resume.types';
import { isError, successResponse } from '@/lib/types';
import { useResumeSummaryStore } from '@/store/useResumeSummaryStore';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

type ResumeSummaryProps = {
	resumeId: string;
	userLogged?: User;
	resumeSummary: DefaultResumeSummary;
};

const ResumeSummary = ({ resumeId, userLogged, resumeSummary }: ResumeSummaryProps) => {
	const router = useRouter();
	const { updateSummary } = useResumeSummaryStore();

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
		<section data-testid="summary">
			<ResumeSummaryForm
				handleSubmit={handleSubmit}
				afterResumeSummaryFormSubmit={afterResumeSummaryFormSubmit}
				submitResponse={data}
				defaultValues={resumeSummary}
				handleDeleteSection={handleDeleteSection}
				resumeId={resumeId}
			/>
		</section>
	);
};

export default ResumeSummary;
