import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import ResumeHeaderIcons from '../resume/header/ResumeHeaderIcons';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface FormTextareaProps<S extends FieldValues> {
	form: UseFormReturn<S, any, undefined>;
	name: Path<S>;
	onHeader?: boolean;
	maxLength: number;
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
}

const FormTextarea = <S extends FieldValues>({ form, name, onHeader = false, maxLength, handleChange }: FormTextareaProps<S>) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const [height, setHeight] = useState('auto');

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
			setHeight(`${textareaRef.current.scrollHeight}px`);
		}
	}, [form.watch(name)]);

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
							ref={textareaRef}
							maxLength={maxLength}
							required
							className={cn('resize-none h-fit', onHeader ? 'w-[70%] ' : 'w-full')}
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
