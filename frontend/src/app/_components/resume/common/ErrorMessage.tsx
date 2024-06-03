import { IconAlertTriangle } from '@tabler/icons-react';

interface ErrorMessageProps {
	isVisible: boolean;
	message?: string;
}

const ErrorMessage = ({ isVisible, message }: ErrorMessageProps) => {
	return (
		<>
			{isVisible && (
				<div className='absolute bottom-0 left-12 flex items-center gap-2 text-red-600'>
					<IconAlertTriangle size={13} />
					<p className='text-xs'>{message}</p>
				</div>
			)}
		</>
	);
};

export default ErrorMessage;
