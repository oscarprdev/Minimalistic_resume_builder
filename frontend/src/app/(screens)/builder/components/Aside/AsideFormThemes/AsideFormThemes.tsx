'use client';

import { postCallback } from '@/services';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import AsideFormThemesPresentation from './AsideFormThemesPresentation';
import { FormThemesDefaultValues, FormThemesValues } from './schema-validations';
import { useRouter, useSearchParams } from 'next/navigation';
import ErrorMessage from '../../ErrorMessage';
import { Either, isLeft } from '@/lib/either';
import { useCaptureResumeImage } from '@/hooks/useCaptureResumeImage';
import { Resume } from '@/types';
import { updateResumeImageAction } from '@/app/actions/resume/update-resume-image.action';

interface AsideFormProps {
	userId?: string;
	defaultValues: FormThemesDefaultValues;
	handleSubmit: (values: FormThemesValues) => Promise<Either<string, string>>;
}

const AsideFormThemes = ({ userId, defaultValues, handleSubmit }: AsideFormProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const resumeId = params.get('resume');
	const theme = params.get('theme') as Resume.theme;

	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const { captureResumeImage } = useCaptureResumeImage({
		theme: theme || Resume.theme.DEFAULT,
		onCanvasGeneratedCallback: async (_: HTMLCanvasElement, imgData: string) => {
			if (resumeId && userId) {
				await updateResumeImageAction({ resumeId, userId, payload: { image: imgData }, postCallback });
			}
		},
	});

	if (!userId) {
		return <ErrorMessage />;
	}

	const onSubmit = async (values: FormThemesValues) => {
		const response = await handleSubmit(values);
		if (!isLeft(response)) {
			captureResumeImage();
		}

		routerAfterSubmit(response, values.theme);
	};

	return (
		<AsideFormThemesPresentation
			onSubmit={onSubmit}
			defaultValues={defaultValues}
		/>
	);
};

export default AsideFormThemes;
