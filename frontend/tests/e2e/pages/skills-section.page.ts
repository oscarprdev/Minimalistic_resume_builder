import { Locator, Page } from '@playwright/test';

export class SkillsSectionPage {
	readonly section: Locator;

	readonly addSkillsBtn: Locator;
	readonly removeSectionBtn: Locator;

	constructor(protected page: Page) {
		this.section = this.page.getByTestId('skills');
		this.removeSectionBtn = this.page.getByTestId('remove-skills');
		this.addSkillsBtn = this.page.getByTestId('add-skill');
	}

	getSkills(index: number) {
		return this.page.getByTestId(`skill-${index}`);
	}

	getRemoveSkillsBtn(index: number) {
		return this.page.getByTestId(`remove-skill-${index}`);
	}
}
