import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input, InputKind } from '@/components/ui/input';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import ResumeHeaderIcons from '../resume/header/ResumeHeaderIcons';

interface FormInputProps<S extends FieldValues> {
	form: UseFormReturn<S, any, undefined>;
	name: Path<S>;
	kind: InputKind;
	error?: string;
	max?: number;
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
}

const FormInput = <S extends FieldValues>({ form, name, kind, error, max, handleChange }: FormInputProps<S>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex items-center -mt-2'>
					<ResumeHeaderIcons value={field.name} />
					<FormControl>
						<Input
							{...field}
							kind={kind}
							maxLength={max}
							onChange={(e) => handleChange(form, field.name, e.target.value)}
						/>
					</FormControl>
					<FormMessage>{error && error}</FormMessage>
				</FormItem>
			)}
		/>
	);
};

export default FormInput;
