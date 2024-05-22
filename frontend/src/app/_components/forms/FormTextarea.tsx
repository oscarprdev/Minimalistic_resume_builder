import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import ResumeHeaderIcons from '../resumeHeader/ResumeHeaderIcons';
import { Textarea } from '@/components/ui/textarea';

interface FormTextareaProps<S extends FieldValues> {
	form: UseFormReturn<S, any, undefined>;
	name: Path<S>;
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
}

const FormTextarea = <S extends FieldValues>({ form, name, handleChange }: FormTextareaProps<S>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex items-center'>
					<ResumeHeaderIcons value={field.name} />
					<FormControl>
						<Textarea
							{...field}
							maxLength={100}
							className='max-w-[60%] resize-none'
							onChange={(e) => handleChange(form, field.name, e.target.value)}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormTextarea;
