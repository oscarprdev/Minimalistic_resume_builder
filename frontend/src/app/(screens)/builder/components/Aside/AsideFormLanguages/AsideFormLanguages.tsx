'use client';

import { ResumeLanguagesDefaultValues } from '@/store/useResumeLanguagesStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormLanguagesValues } from './schema-validations';
import AsideFormLanguagesPresentation from './AsideFormLanguagesPresentation';
import { useDeleteFormCta } from '@/hooks/useDeleteFormCta';
import { revalidatePath } from '@/app/actions/revalidate';
import { API_URL } from '@/constants';
import { deleteCallback } from '@/services';

interface AsideFormLanguagesProps {
	defaultValues?: ResumeLanguagesDefaultValues;
	userId?: string;
	resumeId?: string;
	handleSubmit: (values: FormLanguagesValues) => Promise<Either<string, string>>;
}

export type LanguagesFormState = ResumeLanguagesDefaultValues;

const AsideFormLanguages = ({ defaultValues, userId, resumeId, handleSubmit }: AsideFormLanguagesProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const onSubmit = async (values: FormLanguagesValues) => {
		const response = await handleSubmit(values);

		routerAfterSubmit(response);
	};

	const { deleteInfo, isDeleteCtaPending } = useDeleteFormCta({
		path: userId && resumeId ? `${API_URL}/resume/${userId}/${resumeId}/languages` : null,
		deleteCallback,
		afterDeleteCallback: () => revalidatePath(),
	});

	const onDestructiveClick = () => deleteInfo && deleteInfo();

	return (
		<AsideFormLanguagesPresentation
			defaultValues={defaultValues}
			isDestructiveCtaDisabled={isDeleteCtaPending || !userId || !resumeId}
			isDeleteCtaPending={isDeleteCtaPending}
			onSubmit={onSubmit}
			userId={userId}
			onDestructiveClick={onDestructiveClick}
		/>
	);
};

export default AsideFormLanguages;
