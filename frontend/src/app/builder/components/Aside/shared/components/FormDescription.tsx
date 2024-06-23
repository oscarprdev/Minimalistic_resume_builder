import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';

interface FormDescriptionProps {
	form: UseFormReturn<any, any, undefined>;
	index: number;
	label: 'jobList' | 'educationList';
	isDisabled: boolean;
}
const FormDescription = ({ form, index, label, isDisabled }: FormDescriptionProps) => {
	return (
		<div className='flex flex-col items-start gap-2 w-full'>
			<FormField
				control={form.control}
				name={`${label}.${index}.description`}
				render={({ field }) => (
					<FormItem className='w-full'>
						<FormLabel className='text-sm text-gray-500'>Job Description</FormLabel>
						<FormControl>
							<Textarea
								className='min-h-[100px]'
								placeholder='Job description'
								disabled={isDisabled}
								required
								{...field}
								{...form.register(`${label}.${index}.description`)}
							/>
						</FormControl>
						<FormMessage className='text-xs' />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name={`${label}.${index}.descriptionDisabled`}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<div className='flex items-center gap-2'>
								<p className='text-sm text-purple_200'>Hide description?</p>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
									aria-readonly
								/>
							</div>
						</FormControl>
						<FormMessage className='text-xs' />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default FormDescription;
