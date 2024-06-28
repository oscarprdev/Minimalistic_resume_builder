'use client';

import { ResumeSkillsDefaultValues } from '@/store/useResumeSkillsStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormSkillsValues } from './schema-validations';
import AsideFormSkillsPresentation from './AsideFormSkillsPresentation';
import { useDeleteFormCta } from '@/hooks/useDeleteFormCta';
import { API_URL } from '@/constants';
import { revalidatePath } from '@/app/actions/revalidate';
import { deleteCallback } from '@/services';

interface AsideFormSkillsProps {
	defaultValues?: ResumeSkillsDefaultValues;
	userId?: string;
	resumeId?: string;
	handleSubmit: (values: FormSkillsValues) => Promise<Either<string, string>>;
}

export type SkillsFormState = ResumeSkillsDefaultValues;

const AsideFormSkills = ({ defaultValues, userId, resumeId, handleSubmit }: AsideFormSkillsProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const onSubmit = async (values: FormSkillsValues) => {
		const response = await handleSubmit(values);

		routerAfterSubmit(response);
	};

	const { deleteInfo, isDeleteCtaPending } = useDeleteFormCta({
		path: userId && resumeId ? `${API_URL}/resume/${userId}/${resumeId}/skills` : null,
		deleteCallback,
		afterDeleteCallback: () => {
			const nextPath = resumeId ? `/builder?resume=${resumeId}&selected=skills` : '/builder?selected=skills';
			revalidatePath(nextPath);
		},
	});

	const onDestructiveClick = () => deleteInfo && deleteInfo();

	return (
		<AsideFormSkillsPresentation
			defaultValues={defaultValues}
			isDestructiveCtaDisabled={isDeleteCtaPending || !userId || !resumeId}
			isDeleteCtaPending={isDeleteCtaPending}
			onSubmit={onSubmit}
			onDestructiveClick={onDestructiveClick}
		/>
	);
};

export default AsideFormSkills;
