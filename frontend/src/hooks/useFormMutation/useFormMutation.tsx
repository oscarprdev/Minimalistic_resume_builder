import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { UseFormMutationInput, UseFormMutationOutput } from './useFormMutation.types';
import { useFormSubmission } from './useFormSubmission/useFormSubmission';
import { useDebouncedSubmission } from './useDebouncedSubmission/useDebouncedSubmission';
import { useOptimisticFormState } from './useOptimisticFormState/useOptimisticFormState';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * useFormMutation hook.
 * @param formSchema The schema for the form.
 * @param defaultValues The default values for the form.
 * @param action The action to perform when submitting the form.
 * @param info Additional information needed for the action.
 * @returns An object containing the form, onSubmit function, loading state, and errors.
 */
export const useFormMutation = <S extends FieldValues>({
	formSchema,
	defaultValues,
	info,
	errorMessage,
	action,
}: UseFormMutationInput<S>): UseFormMutationOutput<S> => {
	const form = useForm<S>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues as DefaultValues<S>,
	});

	const { updateFormValues, optimisticFormValues } = useOptimisticFormState({ defaultValues });

	const { onSubmit, loading } = useFormSubmission<S>({ action, info, updateFormValues, errorMessage });

	const { handleChange } = useDebouncedSubmission<S>({ onSubmit });

	return { form, handleChange, loading, errors: form.formState.errors };
};
