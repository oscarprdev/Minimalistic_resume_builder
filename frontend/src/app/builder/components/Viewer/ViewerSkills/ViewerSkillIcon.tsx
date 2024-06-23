import {
	IconBrandTypescript,
	IconBrandJavascript,
	IconBrandHtml5,
	IconBrandCss3,
	IconBrandNodejs,
	IconBrandGithub,
	IconBrandGit,
	IconBrandSass,
	IconBrandTailwind,
	IconBrandReact,
	IconBrandAngular,
	IconBrandVue,
	IconBrandNextjs,
	IconBrandVite,
	IconBrandAws,
	IconBrandCpp,
	IconBrandNpm,
	IconBrandPhp,
	IconBrandThreejs,
	IconBrandDeno,
	IconBrandRust,
	IconBrandAdobe,
	IconBrandAstro,
	IconBrandAzure,
	IconBrandFigma,
	IconBrandMysql,
	IconBrandSwift,
	IconBrandUnity,
	IconBrandDocker,
	IconBrandGolang,
	IconBrandKotlin,
	IconBrandDjango,
	IconBrandPrisma,
	IconBrandGraphql,
	IconBrandSvelte,
	IconBrandLaravel,
	IconBrandFirebase,
	IconBrandSupabase,
	IconBrandBootstrap,
	IconBrandWordpress,
	IconBrandCloudflare,
	IconBrandCSharp,
	IconPointFilled,
} from '@tabler/icons-react';

interface ViewerSkillIconProps {
	value: string;
}

type IconsKeys = keyof typeof SKILLS_ICONS;

const SIZE = 16;

const SKILLS_ICONS = {
	javascript: (
		<IconBrandJavascript
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	typescript: (
		<IconBrandTypescript
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	html: (
		<IconBrandHtml5
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	css: (
		<IconBrandCss3
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	node: (
		<IconBrandNodejs
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	github: (
		<IconBrandGithub
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	git: (
		<IconBrandGit
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	sass: (
		<IconBrandSass
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	tailwind: (
		<IconBrandTailwind
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	react: (
		<IconBrandReact
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	angular: (
		<IconBrandAngular
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	vue: (
		<IconBrandVue
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	next: (
		<IconBrandNextjs
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	vite: (
		<IconBrandVite
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	aws: (
		<IconBrandAws
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	cpp: (
		<IconBrandCpp
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	npm: (
		<IconBrandNpm
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	php: (
		<IconBrandPhp
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	three: (
		<IconBrandThreejs
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	deno: (
		<IconBrandDeno
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	rust: (
		<IconBrandRust
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	adobe: (
		<IconBrandAdobe
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	astro: (
		<IconBrandAstro
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	azure: (
		<IconBrandAzure
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	figma: (
		<IconBrandFigma
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	mysql: (
		<IconBrandMysql
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	swift: (
		<IconBrandSwift
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	unity: (
		<IconBrandUnity
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	docker: (
		<IconBrandDocker
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	go: (
		<IconBrandGolang
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	kotlin: (
		<IconBrandKotlin
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	django: (
		<IconBrandDjango
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	prisma: (
		<IconBrandPrisma
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	graphql: (
		<IconBrandGraphql
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	svelte: (
		<IconBrandSvelte
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	laravel: (
		<IconBrandLaravel
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	firebase: (
		<IconBrandFirebase
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	supabase: (
		<IconBrandSupabase
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	bootstrap: (
		<IconBrandBootstrap
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	wordpress: (
		<IconBrandWordpress
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	cloudflare: (
		<IconBrandCloudflare
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	csharp: (
		<IconBrandCSharp
			id='svg'
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
};

const AVAILABLE_ICONS: Record<IconsKeys, string[]> = {
	javascript: ['javascript', 'js'],
	typescript: ['typescript', 'ts'],
	html: ['html'],
	css: ['css'],
	node: ['node', 'nodejs'],
	github: ['github'],
	git: ['git'],
	sass: ['sass'],
	tailwind: ['tailwind'],
	react: ['react'],
	angular: ['angular'],
	vue: ['vue'],
	svelte: ['svelte'],
	next: ['next', 'next.js', 'nextjs'],
	vite: ['vite'],
	aws: ['aws'],
	cpp: ['c++'],
	npm: ['npm'],
	php: ['php'],
	laravel: ['laravel'],
	three: ['three', 'three.js', 'threejs'],
	deno: ['deno'],
	rust: ['rust'],
	astro: ['astro', 'astro.js'],
	azure: ['azure'],
	figma: ['figma'],
	mysql: ['mysql'],
	swift: ['swift'],
	unity: ['unity'],
	docker: ['docker'],
	go: ['go', 'golang'],
	kotlin: ['kotlin'],
	django: ['django'],
	prisma: ['prisma'],
	graphql: ['graphql'],
	firebase: ['firebase'],
	supabase: ['supabase'],
	bootstrap: ['bootstrap'],
	wordpress: ['wordpress'],
	cloudflare: ['cloudflare'],
	csharp: ['c#'],
	adobe: ['word', 'excel', 'powerpoint', 'power point', 'power-point'],
};

const DEFAULT_ICON = (
	<IconPointFilled
		id='svg'
		stroke={2}
		size={10}
		className='text-gray-500 mt-1'
	/>
);

const ViewerSkillIcon = ({ value }: ViewerSkillIconProps) => {
	const iconMatchWithValue = Object.entries(AVAILABLE_ICONS).find((val) => val[1].includes(value.toLowerCase()));

	if (!iconMatchWithValue) {
		return DEFAULT_ICON;
	}

	return SKILLS_ICONS[iconMatchWithValue[0] as IconsKeys];
};

export default ViewerSkillIcon;
