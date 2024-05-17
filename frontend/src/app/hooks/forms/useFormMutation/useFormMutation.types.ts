import { ZodType } from 'zod';
import { UseFormReturn, FieldErrors, FieldValues, Path } from 'react-hook-form';

export type FormSchema<T> = ZodType<T, any, any>;

export type ActionInput<V> = { userId: string; resumeId: string; values: V };

export interface UseFormMutationInput<S extends FieldValues> {
	formSchema: FormSchema<S>;
	defaultValues: S;
	info: {
		userId: string;
		resumeId: string;
	};
	errorMessage: string;
	action: (input: ActionInput<S>) => Promise<void>;
}

export interface UseFormMutationOutput<S extends FieldValues> {
	form: UseFormReturn<S, any, undefined>;
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
	loading: boolean;
	errors: FieldErrors<S>;
}
