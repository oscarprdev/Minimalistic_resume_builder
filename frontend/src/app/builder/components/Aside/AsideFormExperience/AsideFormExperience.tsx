'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IconLoader2 } from '@tabler/icons-react';
import { Experience } from '@/types';
import AsideFormExperienceJobList from './AsideFormExperienceJobList';

interface AsideFormExperienceProps {
	resumeId: string | null;
}

export type ExperienceFormState = Omit<Experience, 'id'>;

const jobFormSchema = z.object({
	id: z.string(),
	title: z.string(),
	company: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	description: z.string(),
});

const formSchema = z.object({
	title: z.string(),
	jobList: z.array(jobFormSchema).refine(
		(values) => {
			const newItem = values[values.length - 1];

			values.pop();

			const isAlreadyStored = values.some((val) => val.title === newItem.title);

			return !isAlreadyStored;
		},
		{ message: 'Job title must be unique' }
	),
});

const AsideFormExperience = ({ resumeId }: AsideFormExperienceProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			jobList: [],
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Experience title</FormLabel>
							<FormControl>
								<Input
									placeholder='Title'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<AsideFormExperienceJobList form={form} />
				<Button type='submit'>{form.formState.isSubmitting ? <IconLoader2 className='animate-spin text-white' /> : 'Update'}</Button>
			</form>
		</Form>
	);
};

export default AsideFormExperience;
