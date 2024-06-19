import { IconBrandLinkedin, IconBrandGithub, IconWorldWww, IconBrandX, IconBrandInstagram } from '@tabler/icons-react';

interface ViewerHeaderLinksIconsProps {
	value: string;
}

type LinksIconsKeys = keyof typeof LINKS_ICONS;

const LINKS_ICONS = {
	default: (
		<IconWorldWww
			stroke={2}
			size={16}
			className='text-gray-500'
		/>
	),
	linkedin: (
		<IconBrandLinkedin
			stroke={2}
			size={16}
			className='text-gray-500'
		/>
	),
	github: (
		<IconBrandGithub
			stroke={2}
			size={16}
			className='text-gray-500'
		/>
	),
	twitter: (
		<IconBrandX
			stroke={2}
			size={16}
			className='text-gray-500'
		/>
	),
	instagram: (
		<IconBrandInstagram
			stroke={2}
			size={16}
			className='text-gray-500'
		/>
	),
};

const AVAILABLE_ICONS: Record<LinksIconsKeys, LinksIconsKeys> = {
	default: 'default',
	linkedin: 'linkedin',
	github: 'github',
	twitter: 'twitter',
	instagram: 'instagram',
};

const ViewerHeaderLinksIcons = ({ value }: ViewerHeaderLinksIconsProps) => {
	if (value.includes(AVAILABLE_ICONS.linkedin)) {
		return LINKS_ICONS[AVAILABLE_ICONS.linkedin];
	}

	if (value.includes(AVAILABLE_ICONS.github)) {
		return LINKS_ICONS[AVAILABLE_ICONS.github];
	}

	if (value.includes(AVAILABLE_ICONS.twitter)) {
		return LINKS_ICONS[AVAILABLE_ICONS.twitter];
	}

	if (value.includes(AVAILABLE_ICONS.instagram)) {
		return LINKS_ICONS[AVAILABLE_ICONS.instagram];
	}

	return LINKS_ICONS[AVAILABLE_ICONS.default];
};

export default ViewerHeaderLinksIcons;
