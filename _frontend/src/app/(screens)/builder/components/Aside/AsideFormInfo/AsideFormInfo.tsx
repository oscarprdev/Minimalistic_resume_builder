'use client';

import { ResumeInfoDefaultValues } from '@/store/useResumeInfoStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDeleteFormCta } from '../../../../../../hooks/useDeleteFormCta';
import { deleteCallback } from '@/services';
import { API_URL } from '@/constants';
import { FormInfoValues } from './schema-validations';
import AsideFormInfoPresentation from './AsideFormInfoPresentation';
import { revalidatePath } from '@/app/actions/revalidate';

interface AsideFormInfoProps {
	defaultValues?: ResumeInfoDefaultValues;
	userId?: string;
	resumeId?: string;
	handleSubmit: (values: FormInfoValues) => Promise<Either<string, string>>;
}

const AsideFormInfo = ({ defaultValues, userId, resumeId, handleSubmit }: AsideFormInfoProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const onSubmit = async (values: FormInfoValues) => {
		const response = await handleSubmit(values);

		routerAfterSubmit(response);
	};

	const { deleteInfo, isDeleteCtaPending } = useDeleteFormCta({
		path: userId && resumeId ? `${API_URL}/resume/${userId}/${resumeId}/delete` : null,
		deleteCallback,
		afterDeleteCallback: () => {
			const nextPath = '/';
			revalidatePath(nextPath);
			router.push(nextPath);
		},
	});

	const onDestructiveClick = () => deleteInfo && deleteInfo();

	return (
		<AsideFormInfoPresentation
			defaultValues={defaultValues}
			isDestructiveCtaDisabled={isDeleteCtaPending || !userId || !resumeId}
			isDeleteCtaPending={isDeleteCtaPending}
			onSubmit={onSubmit}
			onDestructiveClick={onDestructiveClick}
		/>
	);
};

export default AsideFormInfo;
