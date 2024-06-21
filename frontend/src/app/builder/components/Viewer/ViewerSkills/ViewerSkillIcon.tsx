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
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	typescript: (
		<IconBrandTypescript
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	html: (
		<IconBrandHtml5
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	css: (
		<IconBrandCss3
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	node: (
		<IconBrandNodejs
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	github: (
		<IconBrandGithub
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	git: (
		<IconBrandGit
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	sass: (
		<IconBrandSass
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	tailwind: (
		<IconBrandTailwind
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	react: (
		<IconBrandReact
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	angular: (
		<IconBrandAngular
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	vue: (
		<IconBrandVue
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	next: (
		<IconBrandNextjs
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	vite: (
		<IconBrandVite
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	aws: (
		<IconBrandAws
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	cpp: (
		<IconBrandCpp
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	npm: (
		<IconBrandNpm
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	php: (
		<IconBrandPhp
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	three: (
		<IconBrandThreejs
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	deno: (
		<IconBrandDeno
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	rust: (
		<IconBrandRust
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	adobe: (
		<IconBrandAdobe
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	astro: (
		<IconBrandAstro
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	azure: (
		<IconBrandAzure
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	figma: (
		<IconBrandFigma
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	mysql: (
		<IconBrandMysql
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	swift: (
		<IconBrandSwift
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	unity: (
		<IconBrandUnity
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	docker: (
		<IconBrandDocker
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	go: (
		<IconBrandGolang
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	kotlin: (
		<IconBrandKotlin
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	django: (
		<IconBrandDjango
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	prisma: (
		<IconBrandPrisma
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	graphql: (
		<IconBrandGraphql
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	svelte: (
		<IconBrandSvelte
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	laravel: (
		<IconBrandLaravel
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	firebase: (
		<IconBrandFirebase
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	supabase: (
		<IconBrandSupabase
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	bootstrap: (
		<IconBrandBootstrap
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	wordpress: (
		<IconBrandWordpress
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	cloudflare: (
		<IconBrandCloudflare
			stroke={2}
			size={SIZE}
			className='text-gray-500'
		/>
	),
	csharp: (
		<IconBrandCSharp
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
