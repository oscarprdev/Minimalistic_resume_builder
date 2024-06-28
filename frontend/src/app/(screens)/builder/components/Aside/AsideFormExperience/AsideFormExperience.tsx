'use client';

import { z } from 'zod';
import { ResumeExperienceDefaultValues } from '@/store/useResumeExperienceStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { useSearchParams, useRouter } from 'next/navigation';
import { asideFormExperienceSchema } from './schema-validations';
import AsideFormExperiencePresentation from './AsideFormExperiencePresentation';
import { deleteCallback } from '@/services';
import { useDeleteFormCta } from '@/hooks/useDeleteFormCta';
import { API_URL } from '@/constants';
import { revalidatePath } from '@/app/actions/revalidate';

interface AsideFormExperienceProps {
	defaultValues?: ResumeExperienceDefaultValues;
	userId?: string;
	resumeId?: string;
	handleSubmit: (values: z.infer<typeof asideFormExperienceSchema>) => Promise<Either<string, string>>;
}

export type ExperienceFormState = ResumeExperienceDefaultValues;

const AsideFormExperience = ({ defaultValues, userId, resumeId, handleSubmit }: AsideFormExperienceProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const onSubmit = async (values: z.infer<typeof asideFormExperienceSchema>) => {
		const response = await handleSubmit(values);
		routerAfterSubmit(response);
	};

	const { deleteInfo, isDeleteCtaPending } = useDeleteFormCta({
		path: userId && resumeId ? `${API_URL}/resume/${userId}/${resumeId}/experience` : null,
		deleteCallback,
		afterDeleteCallback: () => {
			const nextPath = resumeId ? `/builder?resume=${resumeId}&selected=experience` : '/builder?selected=experience';
			revalidatePath(nextPath);
		},
	});

	const onDestructiveClick = () => deleteInfo && deleteInfo();

	return (
		<AsideFormExperiencePresentation
			defaultValues={defaultValues}
			isDestructiveCtaDisabled={isDeleteCtaPending || !userId || !resumeId}
			isDeleteCtaPending={isDeleteCtaPending}
			onSubmit={onSubmit}
			onDestructiveClick={onDestructiveClick}
		/>
	);
};

export default AsideFormExperience;
