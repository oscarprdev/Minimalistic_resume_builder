'use client';

import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import AsideFormThemesPresentation from './AsideFormThemesPresentation';
import { FormThemesDefaultValues, FormThemesValues } from './schema-validations';
import { useRouter, useSearchParams } from 'next/navigation';
import ErrorMessage from '../../ErrorMessage';
import { Either } from '@/lib/either';

interface AsideFormProps {
	userId?: string;
	defaultValues: FormThemesDefaultValues;
	handleSubmit: (values: FormThemesValues) => Promise<Either<string, string>>;
}

const AsideFormThemes = ({ userId, defaultValues, handleSubmit }: AsideFormProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	if (!userId) {
		return <ErrorMessage />;
	}

	const onSubmit = async (values: FormThemesValues) => {
		const response = await handleSubmit(values);

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
