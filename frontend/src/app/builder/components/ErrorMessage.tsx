import { IconAlertTriangle } from '@tabler/icons-react';

const ErrorMessage = () => {
	return (
		<div className='grid place-items-center mt-10 text-red-500'>
			<IconAlertTriangle
				size={60}
				stroke={1}
			/>
			<p className='text-center text-sm '>Error retrieving resume information, please refresh the page or contact us.</p>
		</div>
	);
};

export default ErrorMessage;
