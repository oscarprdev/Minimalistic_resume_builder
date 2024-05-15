'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Header } from '@/types';
import { Control, FieldErrors, UseFormReturn, useFieldArray } from 'react-hook-form';
import { HeaderFormState, HeaderFormValues } from './utils';
import ResumeHeaderLinks from './ResumeHeaderLinks';

interface ResumeHeaderFormPresentationProps {
	onSubmit: (values: HeaderFormState) => void;
	form: UseFormReturn<HeaderFormState, any, undefined>;
	formErrors: FieldErrors<HeaderFormState>;
	loading: boolean;
}

const ResumeHeaderFormPresentation = ({ onSubmit, form, formErrors, loading }: ResumeHeaderFormPresentationProps) => {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='job'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<ResumeHeaderLinks
					control={form.control}
					register={form.register}
					errors={formErrors.links && Array.isArray(formErrors.links) ? formErrors.links.map((linkError) => linkError?.message) : []}
				/>
				<Button type='submit'>{loading ? 'loading' : 'submit'}</Button>
			</form>
		</Form>
	);
};

export default ResumeHeaderFormPresentation;
