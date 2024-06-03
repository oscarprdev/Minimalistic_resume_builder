'use client';

import { Form } from '@/components/ui/form';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface SectionWrapperProps<S extends FieldValues> {
	children: React.ReactNode;
	form: UseFormReturn<S, any, undefined>;
}

const SectionWrapper = <S extends FieldValues>({ children, form }: SectionWrapperProps<S>) => {
	return (
		<Form {...form}>
			<form className='relative group border border-transparent border-dashed rounded-lg mt-2 pt-3 pl-8 pb-5 pr-3 hover:border-purple_100 duration-300 '>
				{children}
			</form>
		</Form>
	);
};

export default SectionWrapper;
