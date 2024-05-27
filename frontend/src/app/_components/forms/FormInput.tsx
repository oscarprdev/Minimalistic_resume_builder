import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input, InputKind } from '@/components/ui/input';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import ResumeHeaderIcons from '../resume/header/ResumeHeaderIcons';

interface FormInputProps<S extends FieldValues> {
	form: UseFormReturn<S, any, undefined>;
	name: Path<S>;
	kind: InputKind;
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
}

const FormInput = <S extends FieldValues>({ form, name, kind, handleChange }: FormInputProps<S>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex items-center max-w-[50%]'>
					<ResumeHeaderIcons value={field.name} />
					<FormControl>
						<Input
							{...field}
							kind={kind}
							onChange={(e) => handleChange(form, field.name, e.target.value)}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormInput;
