'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { HeaderFormState } from './utils';
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
				className='group border border-transparent border-dashed rounded-lg p-8 hover:border-purple_100 duration-300'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									kind={'title'}
									{...field}
								/>
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
								<Input
									kind={'subtitle'}
									{...field}
								/>
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
								<Input
									kind={'text'}
									{...field}
								/>
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
								<Input
									kind={'label'}
									{...field}
								/>
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
								<Input
									kind={'label'}
									{...field}
								/>
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
				<Button
					className='hidden'
					type='submit'>
					{loading ? 'loading' : 'submit'}
				</Button>
			</form>
		</Form>
	);
};

export default ResumeHeaderFormPresentation;
