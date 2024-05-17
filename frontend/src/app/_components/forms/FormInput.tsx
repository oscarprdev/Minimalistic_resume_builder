import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface FormInputProps<S extends FieldValues> {
	form: UseFormReturn<S, any, undefined>;
	name: Path<S>;
	kind?: 'default' | 'label' | 'text' | 'subtitle' | 'sectionTitle' | 'title';
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
}

const FormInput = <S extends FieldValues>({ form, name, kind, handleChange }: FormInputProps<S>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
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
