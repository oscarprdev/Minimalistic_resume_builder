import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandX, IconWorldWww } from '@tabler/icons-react';

interface ViewerHeaderLinksIconsProps {
	value: string;
}

type LinksIconsKeys = keyof typeof LINKS_ICONS;

const LINKS_ICONS = {
	default: <IconWorldWww size={14} className="text-zinc-700" />,
	linkedin: <IconBrandLinkedin size={14} className="text-zinc-700" />,
	github: <IconBrandGithub size={14} className="text-zinc-700" />,
	twitter: <IconBrandX size={14} className="text-zinc-700" />,
	instagram: <IconBrandInstagram size={14} className="text-zinc-700" />,
};

const AVAILABLE_ICONS: Record<LinksIconsKeys, LinksIconsKeys> = {
	default: 'default',
	linkedin: 'linkedin',
	github: 'github',
	twitter: 'twitter',
	instagram: 'instagram',
};

const HeaderLinksIcons = ({ value }: ViewerHeaderLinksIconsProps) => {
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

export default HeaderLinksIcons;
