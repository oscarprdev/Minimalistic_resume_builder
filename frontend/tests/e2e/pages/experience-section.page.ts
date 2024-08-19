import { Locator, Page } from '@playwright/test';

export class ExperienceSectionPage {
	readonly section: Locator;

	readonly addExperienceBtn: Locator;
	readonly removeSectionBtn: Locator;

	constructor(protected page: Page) {
		this.section = this.page.getByTestId('experience');
		this.removeSectionBtn = this.page.getByTestId('remove-experience');
		this.addExperienceBtn = this.page.getByTestId('add-experience');
	}

	getExperience(index: number) {
		return this.page.getByTestId(`experience-${index}`);
	}

	getRemoveExperienceBtn(index: number) {
		return this.page.getByTestId(`remove-experience-${index}`);
	}
}
