import { useMemo } from 'react';
import { FORMAT_TIME_VALUES } from '../../Aside/shared/components/FormDates';
import { getTimeDifference } from '@/lib/utils';

interface LabelWithDatesProps {
	label: string;
	startDate: string;
	endDate: string;
	formatTime: string;
}

const LabelWithDates = ({ label, startDate, endDate, formatTime }: LabelWithDatesProps) => {
	const isCurrently = useMemo(() => formatTime.match(FORMAT_TIME_VALUES.CURRENTLY), [formatTime]);
	const onlyYear = useMemo(() => formatTime.match(FORMAT_TIME_VALUES.YEAR), [formatTime]);
	const showDuration = useMemo(() => formatTime.match(FORMAT_TIME_VALUES.DURATION), [formatTime]);

	const formatStartDate = (date: string) => {
		if (!onlyYear) return date;

		return date.split('-')[0];
	};

	const formatEndDate = (date: string) => {
		if (!onlyYear && !isCurrently) return date;

		if (isCurrently) return 'Currently';

		if (onlyYear) return date.split('-')[0];
	};

	return (
		<div className='flex items-center gap-4 pl-6 '>
			<p className='text-sm'>{label}</p>
			<span
				aria-hidden
				className='block mt-[2px] w-[1px] h-[10px] bg-gray-800'
			/>
			<div
				id='dates'
				className='flex items-center gap-2 mt-[2px]'>
				<p className='text-xs text-gray-600'>{formatStartDate(startDate)}</p>
				<p className='text-xs text-gray-600'>{'-'}</p>
				<p className='text-xs text-gray-600'>{formatEndDate(endDate)}</p>
				{showDuration && <p className='text-xs text-gray-600'>({getTimeDifference(startDate, endDate)})</p>}
			</div>
		</div>
	);
};

export default LabelWithDates;
