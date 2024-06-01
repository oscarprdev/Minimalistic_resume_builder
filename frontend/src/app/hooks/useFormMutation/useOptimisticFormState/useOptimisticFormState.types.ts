import { DefaultValues, FieldValues } from 'react-hook-form';

export interface UseOptimisticFormStateInput<S extends FieldValues> {
	defaultValues: S;
}

export interface UseOptimisticFormStateOutput<S extends FieldValues> {
	optimisticFormValues: S;
	updateFormValues: (values: S) => void;
}
