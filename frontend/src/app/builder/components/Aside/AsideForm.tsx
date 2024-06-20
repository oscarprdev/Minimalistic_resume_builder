'use server';

import { cn } from '@/lib/utils';
import { SECTION_CONTROL, SectionControl } from '../_utils/sections';
import AsideFormExperienceController from './AsideFormExperience/AsideFormExperienceController';
import AsideFormHeaderController from './AsideFormHeader/AsideFormHeaderController';
import AsideFormInfoController from './AsideFormInfo/AsideFormInfoController';
import AsideFormSummaryController from './AsideFormSummary/AsideFormSummaryController';
import AsideFormEducationController from './AsideFormEducation/AsideFormEducationController';
import AsideFormLanguagesController from './AsideFormLanguages/AsideFormLanguagesController';

interface AsideFormProps {
	sectionSelected: SectionControl | null;
	resumeId: string | null;
}

const AsideForm = async ({ sectionSelected, resumeId }: AsideFormProps) => {
	const renderSelectedForm = (sectionSelected: SectionControl | null) => {
		switch (sectionSelected) {
			case SECTION_CONTROL.INFO:
				return <AsideFormInfoController resumeId={resumeId} />;
			case SECTION_CONTROL.HEADER:
				return <AsideFormHeaderController resumeId={resumeId} />;
			case SECTION_CONTROL.SUMMARY:
				return <AsideFormSummaryController resumeId={resumeId} />;
			case SECTION_CONTROL.EXPERIENCE:
				return <AsideFormExperienceController resumeId={resumeId} />;
			case SECTION_CONTROL.EDUCATION:
				return <AsideFormEducationController resumeId={resumeId} />;
			case SECTION_CONTROL.LANGUAGES:
				return <AsideFormLanguagesController resumeId={resumeId} />;
			default:
				break;
		}
	};

	return (
		<section
			className={cn('bg-white w-1/4 min-w-[400px] p-5 overflow-scroll', sectionSelected ? 'animate-fade-right' : 'animate-fade-left')}>
			{renderSelectedForm(sectionSelected)}
		</section>
	);
};

export default AsideForm;
