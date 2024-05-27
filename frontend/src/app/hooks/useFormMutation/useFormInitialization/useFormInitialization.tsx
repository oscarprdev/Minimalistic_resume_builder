import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues, DefaultValues } from 'react-hook-form';
import { UseFormInitializationInput, UseFormInitializationOutput } from './useFormInitialization.types';

export function useFormInitialization<S extends FieldValues>({
	formSchema,
	defaultValues,
}: UseFormInitializationInput<S>): UseFormInitializationOutput<S> {
	const form = useForm<S>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues as DefaultValues<S>,
	});

	const setDefaultValues = (newValues: DefaultValues<S>) => {
		form.reset(newValues);
	};

	return { form, setDefaultValues };
}
