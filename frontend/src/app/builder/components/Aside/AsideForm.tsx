'use server';

import { SECTION_CONTROL, SectionControl } from '../_utils/sections';
import AsideFormExperience from './AsideFormExperience';
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
			case SECTION_CONTROL.SUMMARY:
				return <AsideFormSummaryController resumeId={resumeId} />;
			case SECTION_CONTROL.EXPERIENCE:
				return <AsideFormExperience resumeId={resumeId} />;
			default:
				break;
		}
	};

	return <section className='bg-white w-1/4 min-w-[350px] p-5'>{renderSelectedForm(sectionSelected)}</section>;
};

export default AsideForm;
