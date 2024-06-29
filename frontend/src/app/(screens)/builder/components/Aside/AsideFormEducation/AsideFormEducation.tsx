'use client';

import { ResumeEducationDefaultValues } from '@/store/useResumeEducationStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormEducationValues } from './schema-validations';
import { deleteCallback } from '@/services';
import { useDeleteFormCta } from '@/hooks/useDeleteFormCta';
import { revalidatePath } from '@/app/actions/revalidate';
import AsideFormEducationPresentation from './AsideFormEducationPresentation';
import { API_URL } from '@/constants';

interface AsideFormEducationProps {
	defaultValues?: ResumeEducationDefaultValues;
	userId?: string;
	resumeId?: string;
	handleSubmit: (values: FormEducationValues) => Promise<Either<string, string>>;
}

export type EducationFormState = ResumeEducationDefaultValues;

const AsideFormEducation = ({ defaultValues, userId, resumeId, handleSubmit }: AsideFormEducationProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const onSubmit = async (values: FormEducationValues) => {
		const response = await handleSubmit(values);

		routerAfterSubmit(response);
	};

	const { deleteInfo, isDeleteCtaPending } = useDeleteFormCta({
		path: userId && resumeId ? `${API_URL}/resume/${userId}/${resumeId}/education` : null,
		deleteCallback,
		afterDeleteCallback: () => revalidatePath(),
	});

	const onDestructiveClick = () => deleteInfo && deleteInfo();

	return (
		<AsideFormEducationPresentation
			defaultValues={defaultValues}
			isDestructiveCtaDisabled={isDeleteCtaPending || !userId || !resumeId}
			isDeleteCtaPending={isDeleteCtaPending}
			isUserLogged={Boolean(userId)}
			onSubmit={onSubmit}
			onDestructiveClick={onDestructiveClick}
		/>
	);
};

export default AsideFormEducation;
