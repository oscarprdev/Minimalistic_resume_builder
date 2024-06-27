'use server';

import { User } from 'next-auth';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { SECTION_CONTROL, SectionControl } from '../_utils/sections';
import AsideFormExperienceController from './AsideFormExperience/AsideFormExperienceController';
import AsideFormHeaderController from './AsideFormHeader/AsideFormHeaderController';
import AsideFormInfoController from './AsideFormInfo/AsideFormInfoController';
import AsideFormSummaryController from './AsideFormSummary/AsideFormSummaryController';
import AsideFormLanguagesController from './AsideFormLanguages/AsideFormLanguagesController';
import AsideFormSkillsController from './AsideFormSkills/AsideFormSkillsController';
import AsideFormInfoSkeleton from './AsideFormInfo/AsideFormInfoSkeleton';
import AsideFormHeaderSkeleton from './AsideFormHeader/AsideFormHeaderSkeleton';
import AsideFormSummarySkeleton from './AsideFormSummary/AsideFormSummarySkeleton';
import AsideFormExperienceSkeleton from './AsideFormExperience/AsideFormExperienceSkeleton';
import AsideFormLanguagesSkeleton from './AsideFormLanguages/AsideFormLanguagesSkeleton';
import AsideFormSkillsSkeleton from './AsideFormSkills/AsideFormSkillsSkeleton';
import AsideFormEducationSkeleton from './AsideFormEducation/AsideFormEducationSkeleton';
import AsideFormEducationController from './AsideFormEducation/AsideFormEducationController';

interface AsideFormProps {
	sectionSelected: SectionControl | null;
	resumeId: string | null;
	user?: User;
}

const AsideForm = async ({ sectionSelected, resumeId, user }: AsideFormProps) => {
	const renderSelectedForm = (sectionSelected: SectionControl | null) => {
		switch (sectionSelected) {
			case SECTION_CONTROL.INFO:
				return (
					<Suspense fallback={<AsideFormInfoSkeleton />}>
						<AsideFormInfoController
							resumeId={resumeId}
							user={user}
						/>
					</Suspense>
				);
			case SECTION_CONTROL.HEADER:
				return (
					<Suspense fallback={<AsideFormHeaderSkeleton />}>
						<AsideFormHeaderController
							resumeId={resumeId}
							user={user}
						/>
					</Suspense>
				);
			case SECTION_CONTROL.SUMMARY:
				return (
					<Suspense fallback={<AsideFormSummarySkeleton />}>
						<AsideFormSummaryController
							resumeId={resumeId}
							user={user}
						/>
					</Suspense>
				);
			case SECTION_CONTROL.EXPERIENCE:
				return (
					<Suspense fallback={<AsideFormExperienceSkeleton />}>
						<AsideFormExperienceController
							resumeId={resumeId}
							user={user}
						/>
					</Suspense>
				);
			case SECTION_CONTROL.EDUCATION:
				return (
					<Suspense fallback={<AsideFormEducationSkeleton />}>
						<AsideFormEducationController
							resumeId={resumeId}
							user={user}
						/>
					</Suspense>
				);
			case SECTION_CONTROL.LANGUAGES:
				return (
					<Suspense fallback={<AsideFormLanguagesSkeleton />}>
						<AsideFormLanguagesController
							resumeId={resumeId}
							user={user}
						/>
					</Suspense>
				);
			case SECTION_CONTROL.SKILLS:
				return (
					<Suspense fallback={<AsideFormSkillsSkeleton />}>
						<AsideFormSkillsController
							resumeId={resumeId}
							user={user}
						/>
					</Suspense>
				);
			default:
				break;
		}
	};

	return (
		<section
			className={cn(
				'z-5 bg-white w-1/4 min-w-[400px] p-5 overflow-scroll border border-transparent border-r-gray-200 shadow-md hidden',
				sectionSelected ? 'animate-fade-right block' : 'animate-fade-left '
			)}>
			{renderSelectedForm(sectionSelected)}
		</section>
	);
};

export default AsideForm;
