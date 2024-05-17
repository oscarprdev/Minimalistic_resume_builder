import { ActionInput } from '../useFormMutation/useFormMutation.types';

export interface UseFormSubmissionInput<S> {
	action: (input: ActionInput<S>) => Promise<void>;
	info: { userId: string; resumeId: string };
	updateFormValues: (values: S) => void;
	errorMessage: string;
}

export interface UseFormSubmissionOutput<S> {
	onSubmit: (values: S) => Promise<void>;
	isPending: boolean;
}
