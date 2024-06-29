'use client';

import { ResumeExperienceDefaultValues } from '@/store/useResumeExperienceStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormExperienceValues } from './schema-validations';
import AsideFormExperiencePresentation from './AsideFormExperiencePresentation';
import { deleteCallback } from '@/services';
import { useDeleteFormCta } from '@/hooks/useDeleteFormCta';
import { API_URL } from '@/constants';
import { revalidatePath } from '@/app/actions/revalidate';

interface AsideFormExperienceProps {
	defaultValues?: ResumeExperienceDefaultValues;
	userId?: string;
	resumeId?: string;
	handleSubmit: (values: FormExperienceValues) => Promise<Either<string, string>>;
}

export type ExperienceFormState = ResumeExperienceDefaultValues;

const AsideFormExperience = ({ defaultValues, userId, resumeId, handleSubmit }: AsideFormExperienceProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const onSubmit = async (values: FormExperienceValues) => {
		const response = await handleSubmit(values);
		routerAfterSubmit(response);
	};

	const { deleteInfo, isDeleteCtaPending } = useDeleteFormCta({
		path: userId && resumeId ? `${API_URL}/resume/${userId}/${resumeId}/experience` : null,
		deleteCallback,
		afterDeleteCallback: () => revalidatePath(),
	});

	const onDestructiveClick = () => deleteInfo && deleteInfo();

	return (
		<AsideFormExperiencePresentation
			defaultValues={defaultValues}
			isDestructiveCtaDisabled={isDeleteCtaPending || !userId || !resumeId}
			isDeleteCtaPending={isDeleteCtaPending}
			onSubmit={onSubmit}
			isUserLogged={Boolean(userId)}
			onDestructiveClick={onDestructiveClick}
		/>
	);
};

export default AsideFormExperience;
