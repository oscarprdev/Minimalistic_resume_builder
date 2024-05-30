import { Path, UseFormReturn } from 'react-hook-form';
import FormTextarea from '../../forms/FormTextarea';
import { EducationFormState } from './utils';
import { Button } from '@/components/ui/button';

interface ResumeEducationDescriptionFieldProps {
	index: number;
	form: UseFormReturn<EducationFormState, any, undefined>;
	handleChange: (form: UseFormReturn<EducationFormState>, name: Path<EducationFormState>, value: any) => void;
}

const DEFAULT_DESCRIPTION = 'Your education description';

const ResumeEducationDescriptionField = ({ index, form, handleChange }: ResumeEducationDescriptionFieldProps) => {
	const educationDescription = form.watch('educationList')[index].description;

	const handleAddDescriptionBtn = () => {
		handleChange(form, `educationList.${index}.description`, DEFAULT_DESCRIPTION);
	};

	return (
		<>
			{educationDescription.length > 0 ? (
				<FormTextarea
					form={form}
					name={`educationList.${index}.description`}
					maxLength={400}
					handleChange={handleChange}
				/>
			) : (
				<Button
					type='button'
					variant={'outline'}
					size={'sm'}
					onClick={() => handleAddDescriptionBtn()}
					className='absolute self-center opacity-0 group-hover:opacity-100 transition duration-300'>
					Add description
				</Button>
			)}
		</>
	);
};

export default ResumeEducationDescriptionField;
