import { Form } from '@/components/ui/form';
import FormSectionHiddenSwitch from './FormSectionHiddenSwitch';
import { UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

interface FormContainerProps<T> {
	form: UseFormReturn<any, any, undefined>;
	isUserLogged?: boolean;
	onSubmit: (values: T) => Promise<void>;
	children: ReactNode;
}

const FormContainer = ({ form, isUserLogged = false, onSubmit, children }: FormContainerProps<any>) => {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='relative space-y-6 animate-fade-up'>
				{isUserLogged && <FormSectionHiddenSwitch form={form} />}
				{children}
			</form>
		</Form>
	);
};

export default FormContainer;
