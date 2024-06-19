'use server';

import { SECTION_CONTROL, SectionControl } from '../_utils/sections';
import AsideFormexperienceController from './AsideFormExperience/AsideFormExperienceController';
import AsideFormHeaderController from './AsideFormHeader/AsideFormHeaderController';
import AsideFormInfoController from './AsideFormInfo/AsideFormInfoController';
import AsideFormSummaryController from './AsideFormSummary/AsideFormSummaryController';

interface AsideFormProps {
	sectionSelected: SectionControl;
	resumeId: string | null;
}

const AsideForm = async ({ sectionSelected, resumeId }: AsideFormProps) => {
	const renderSelectedForm = (sectionSelected: SectionControl) => {
		switch (sectionSelected) {
			case SECTION_CONTROL.INFO:
				return <AsideFormInfoController resumeId={resumeId} />;
			case SECTION_CONTROL.HEADER:
				return <AsideFormHeaderController resumeId={resumeId} />;
			case SECTION_CONTROL.SUMMARY:
				return <AsideFormSummaryController resumeId={resumeId} />;
			case SECTION_CONTROL.EXPERIENCE:
				return <AsideFormexperienceController resumeId={resumeId} />;
			default:
				break;
		}
	};

	return <section className='bg-white w-1/4 min-w-[350px] p-5 overflow-scroll'>{renderSelectedForm(sectionSelected)}</section>;
};

export default AsideForm;
