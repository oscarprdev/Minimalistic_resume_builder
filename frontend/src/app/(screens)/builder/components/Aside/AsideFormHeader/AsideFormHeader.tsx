'use client';

import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { Either } from '@/lib/either';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResumeHeaderDefaultValues } from '@/store/useResumeHeaderStore';
import AsideFormHeaderPresentation from './AsideFormHeaderPresentation';
import { FormHeaderValues } from './schema-validations';
import { useDeleteFormCta } from '@/hooks/useDeleteFormCta';
import { deleteCallback } from '@/services';
import { API_URL } from '@/constants';
import { revalidatePath } from '@/app/actions/revalidate';

interface AsideFormHeaderProps {
	defaultValues?: ResumeHeaderDefaultValues;
	userId?: string;
	resumeId?: string;
	handleSubmit: (values: FormHeaderValues) => Promise<Either<string, string>>;
	updateImage: (formData: FormData) => Promise<Either<string, string>>;
	removeImage: () => Promise<Either<string, string>>;
}

const AsideFormHeader = ({ defaultValues, userId, resumeId, handleSubmit, updateImage, removeImage }: AsideFormHeaderProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const onSubmit = async (values: FormHeaderValues) => {
		const response = await handleSubmit(values);

		routerAfterSubmit(response);
	};

	const { deleteInfo, isDeleteCtaPending } = useDeleteFormCta({
		path: userId && resumeId ? `${API_URL}/resume/${userId}/${resumeId}/header` : null,
		deleteCallback,
		afterDeleteCallback: () => {
			const nextPath = resumeId ? `/builder?resume=${resumeId}&selected=header` : '/builder?selected=header';
			revalidatePath(nextPath);
		},
	});

	const onDestructiveClick = () => deleteInfo && deleteInfo();

	return (
		<AsideFormHeaderPresentation
			defaultValues={defaultValues}
			isDestructiveCtaDisabled={isDeleteCtaPending || !userId || !resumeId}
			isDeleteCtaPending={isDeleteCtaPending}
			onSubmit={onSubmit}
			onDestructiveClick={onDestructiveClick}
			updateImage={updateImage}
			removeImage={removeImage}
		/>
	);
};

export default AsideFormHeader;
