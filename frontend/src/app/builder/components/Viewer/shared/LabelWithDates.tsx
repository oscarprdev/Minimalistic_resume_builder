interface LabelWithDatesProps {
	label: string;
	startDate: string;
	endDate: string;
}

const LabelWithDates = ({ label, startDate, endDate }: LabelWithDatesProps) => {
	return (
		<div className='flex items-center gap-4 pl-6 '>
			<p className='text-sm'>{label}</p>
			<span
				aria-hidden
				className='block w-[1px] h-[10px] bg-gray-800'
			/>
			<div className='flex items-center gap-2 '>
				<p className='text-xs text-gray-600'>{startDate}</p>
				<p className='text-xs text-gray-600'>{'-'}</p>
				<p className='text-xs text-gray-600'>{endDate}</p>
			</div>
		</div>
	);
};

export default LabelWithDates;
