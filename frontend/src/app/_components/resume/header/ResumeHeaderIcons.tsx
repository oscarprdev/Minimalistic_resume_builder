import { IconMapPin, IconPhone, IconMail } from '@tabler/icons-react';

interface ResumeHeaderIconsProps {
	value: string;
}

type IconsKeys = keyof typeof HEADER_ICONS;

const HEADER_ICONS = {
	location: (
		<IconMapPin
			stroke={2}
			size={18}
			className='mt-[0.5rem] ml-2 -mr-1 text-gray-500'
		/>
	),
	phone: (
		<IconPhone
			stroke={2}
			size={18}
			className='mt-[0.5rem] ml-2 -mr-1 text-gray-500'
		/>
	),
	mail: (
		<IconMail
			stroke={2}
			size={18}
			className='mt-[0.5rem] ml-2 -mr-1 text-gray-500'
		/>
	),
};

const AVAILABLE_ICONS: Record<IconsKeys, IconsKeys> = {
	location: 'location',
	phone: 'phone',
	mail: 'mail',
};

const ResumeHeaderIcons = ({ value }: ResumeHeaderIconsProps) => {
	if (value.includes(AVAILABLE_ICONS.location)) {
		return HEADER_ICONS[AVAILABLE_ICONS.location];
	}

	if (value.includes(AVAILABLE_ICONS.phone)) {
		return HEADER_ICONS[AVAILABLE_ICONS.phone];
	}

	if (value.includes(AVAILABLE_ICONS.mail)) {
		return HEADER_ICONS[AVAILABLE_ICONS.mail];
	}

	return <></>;
};

export default ResumeHeaderIcons;
