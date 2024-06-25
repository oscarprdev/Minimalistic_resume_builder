import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { ZodType } from 'zod';

export type FormSchema<T> = ZodType<T, any, any>;

interface UseDynamicFormInput<S extends FieldValues> {
	schema: FormSchema<S>;
	defaultValues?: S;
}

export const useDynamicForm = <S extends FieldValues>({ schema, defaultValues }: UseDynamicFormInput<S>) => {
	const form = useForm<S>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as DefaultValues<S>,
	});

	useEffect(() => {
		form.reset(defaultValues);
	}, [defaultValues]);

	return form;
};
