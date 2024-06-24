'use server';

import { IconPlus, IconMinus } from '@tabler/icons-react';
import Link from 'next/link';
import { SECTION_CONTROL, SectionControl } from '../_utils/sections';
import { cn } from '@/lib/utils';
import { useUserLogged } from '@/hooks/useUserLogged';

interface AsideSectionItemProps {
	label: string;
	control: SectionControl;
	sectionSelected: SectionControl | null;
	resumeId: string | null;
}

const AsideSectionItem = async ({ label, control, sectionSelected, resumeId }: AsideSectionItemProps) => {
	const user = await useUserLogged();

	const isSectionSelected = (control: SectionControl, sectionSelected: SectionControl | null) => {
		if (control === SECTION_CONTROL.HEADER && !!sectionSelected) true;

		return sectionSelected === control;
	};

	const pathToRedirect = (resumeId: string | null, sectionSelected: SectionControl | null) => {
		const basePath = '/builder';
		const controlSelected = sectionSelected === control;

		if (!resumeId) {
			return controlSelected ? basePath : `${basePath}?selected=${control}`;
		}

		const resumePath = `${basePath}?resume=${resumeId}`;
		return controlSelected ? resumePath : `${resumePath}&selected=${control}`;
	};

	const isItemDisabled = user && user.id && !resumeId && control !== SECTION_CONTROL.INFO;

	return (
		<li
			className={cn(
				'cursor-pointer group w-full p-5 border border-transparent border-b-gray-200',
				isItemDisabled && 'bg-gray-100 cursor-not-allowed'
			)}>
			<Link
				href={pathToRedirect(resumeId, sectionSelected)}
				className={cn('flex items-center justify-between', isItemDisabled && 'text-gray-300 cursor-not-allowed')}>
				<p
					className={cn(
						'text-sm group-hover:text-purple_200',
						isItemDisabled && 'group-hover:text-gray-300',
						isSectionSelected(control, sectionSelected) && 'text-purple_200'
					)}>
					{label}
				</p>
				{isSectionSelected(control, sectionSelected) ? (
					<IconMinus
						stroke={1}
						className={cn(
							'text-gray-700',
							isItemDisabled && 'text-gray-300 group-hover:text-gray-300',
							isSectionSelected(control, sectionSelected) && 'text-purple_200'
						)}
					/>
				) : (
					<IconPlus
						stroke={1}
						className={cn('text-gray-700 group-hover:text-purple_200', isItemDisabled && 'text-gray-300 group-hover:text-gray-300')}
					/>
				)}
			</Link>
		</li>
	);
};

export default AsideSectionItem;
