import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import { ZodSchema } from 'zod';

export interface UseFormInitializationInput<S> {
	formSchema: ZodSchema<S>;
	defaultValues: S;
}

export interface UseFormInitializationOutput<S extends FieldValues> {
	form: UseFormReturn<S, any, undefined>;
	setDefaultValues: (newValues: DefaultValues<S>) => void;
}
