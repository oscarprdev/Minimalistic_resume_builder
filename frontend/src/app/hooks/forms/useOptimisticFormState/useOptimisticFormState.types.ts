import { DefaultValues, FieldValues } from 'react-hook-form';

export interface UseOptimisticFormStateInput<S extends FieldValues> {
	defaultValues: S;
	setDefaultValues: (newValues: DefaultValues<S>) => void;
}

export interface UseOptimisticFormStateOutput<S extends FieldValues> {
	updateFormValues: (values: S) => void;
}
