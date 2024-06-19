import { IconMapPin, IconPhone, IconMail } from '@tabler/icons-react';

interface ViewerHeaderIconsProps {
	value: string;
}

type IconsKeys = keyof typeof HEADER_ICONS;

const HEADER_ICONS = {
	location: (
		<IconMapPin
			stroke={2}
			size={16}
			className='text-gray-500'
		/>
	),
	phone: (
		<IconPhone
			stroke={2}
			size={16}
			className='text-gray-500'
		/>
	),
	mail: (
		<IconMail
			stroke={2}
			size={16}
			className='text-gray-500'
		/>
	),
};

const AVAILABLE_ICONS: Record<IconsKeys, IconsKeys> = {
	location: 'location',
	phone: 'phone',
	mail: 'mail',
};

const ViewerHeaderIcons = ({ value }: ViewerHeaderIconsProps) => {
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

export default ViewerHeaderIcons;
