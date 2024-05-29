import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface FormTextareaProps<S extends FieldValues> {
	form: UseFormReturn<S, any, undefined>;
	name: Path<S>;
	onHeader?: boolean;
	maxLength: number;
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
}

const FormTextarea = <S extends FieldValues>({ form, name, onHeader = false, maxLength, handleChange }: FormTextareaProps<S>) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const element = textareaRef.current;
		if (element) {
			element.style.height = '1px';
			element.style.height = element.scrollHeight + 'px';
		}
	}, [form.watch(name)]);

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex items-center w-full'>
					<FormControl>
						<Textarea
							{...field}
							ref={textareaRef}
							maxLength={maxLength}
							required
							className={cn('text-pretty resize-none overflow-hidden', onHeader ? 'w-[70%]' : 'w-full text-gray-500')}
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
