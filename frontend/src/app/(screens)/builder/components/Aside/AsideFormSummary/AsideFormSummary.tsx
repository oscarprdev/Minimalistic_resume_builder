'use client';

import { ResumeSummaryDefaultValues } from '@/store/useResumeSummaryStore';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { Either } from '@/lib/either';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormSummaryValues } from './schema-validations';
import AsideFormSummaryPresentation from './AsideFormSummaryPresentation';
import { deleteCallback } from '@/services';
import { API_URL } from '@/constants';
import { revalidatePath } from '@/app/actions/revalidate';
import { useDeleteFormCta } from '@/hooks/useDeleteFormCta';

interface AsideFormSummaryProps {
	defaultValues?: ResumeSummaryDefaultValues;
	userId?: string;
	resumeId?: string;
	handleSubmit: (values: FormSummaryValues) => Promise<Either<string, string>>;
}

const AsideFormSummary = ({ defaultValues, userId, resumeId, handleSubmit }: AsideFormSummaryProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const onSubmit = async (values: FormSummaryValues) => {
		const response = await handleSubmit(values);

		routerAfterSubmit(response);
	};

	const { deleteInfo, isDeleteCtaPending } = useDeleteFormCta({
		path: userId && resumeId ? `${API_URL}/resume/${userId}/${resumeId}/summary` : null,
		deleteCallback,
		afterDeleteCallback: () => {
			const nextPath = resumeId ? `/builder?resume=${resumeId}&selected=summary` : '/builder?selected=summary';
			revalidatePath(nextPath);
		},
	});

	const onDestructiveClick = () => deleteInfo && deleteInfo();

	return (
		<AsideFormSummaryPresentation
			defaultValues={defaultValues}
			isDestructiveCtaDisabled={isDeleteCtaPending || !userId || !resumeId}
			isDeleteCtaPending={isDeleteCtaPending}
			onSubmit={onSubmit}
			onDestructiveClick={onDestructiveClick}
		/>
	);
};

export default AsideFormSummary;
