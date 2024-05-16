import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { startTransition, useEffect, useOptimistic } from 'react';
import { useForm, FieldValues, DefaultValues } from 'react-hook-form';
import { ActionInput, UseFormMutationInput, UseFormMutationOutput } from './useFormMutation.types';

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
	const [optimisticFormValues, updateFormValues] = useOptimistic<S, S>(defaultValues, (_, optimistic) => ({
		...optimistic,
	}));

	const form = useForm<S>({
		resolver: zodResolver(formSchema),
		defaultValues: optimisticFormValues as DefaultValues<S>,
	});

	useEffect(() => {
		form.reset(optimisticFormValues);
	}, [optimisticFormValues]);

	const { mutate, error, isPending } = useMutation({
		mutationFn: (input: ActionInput<S>) => action(input),
	});

	const onSubmit = async (values: S) => {
		startTransition(() => {
			updateFormValues(values);
		});

		const mutationInput = { ...info, values };
		mutate(mutationInput);
	};

	useEffect(() => {
		if (error) {
			toast({
				title: 'Error',
				description: errorMessage,
				variant: 'destructive',
			});
		}
	}, [error]);

	return { form, onSubmit, loading: isPending, errors: form.formState.errors } satisfies UseFormMutationOutput<S>;
};
