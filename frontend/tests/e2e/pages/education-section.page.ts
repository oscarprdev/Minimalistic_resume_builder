import { Locator, Page } from '@playwright/test';

export class EducationSectionPage {
	readonly section: Locator;

	readonly addEducationBtn: Locator;
	readonly removeSectionBtn: Locator;

	constructor(protected page: Page) {
		this.section = this.page.getByTestId('education');
		this.removeSectionBtn = this.page.getByTestId('remove-education');
		this.addEducationBtn = this.page.getByTestId('add-education');
	}

	getEducation(index: number) {
		return this.page.getByTestId(`education-${index}`);
	}

	getRemoveEducationBtn(index: number) {
		return this.page.getByTestId(`remove-education-${index}`);
	}
}
