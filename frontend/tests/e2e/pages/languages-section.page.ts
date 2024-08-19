import { Locator, Page } from '@playwright/test';

export class LanguagesSectionPage {
	readonly section: Locator;

	readonly addLanguagesBtn: Locator;
	readonly removeSectionBtn: Locator;

	constructor(protected page: Page) {
		this.section = this.page.getByTestId('languages');
		this.removeSectionBtn = this.page.getByTestId('remove-languages');
		this.addLanguagesBtn = this.page.getByTestId('add-language');
	}

	getLanguages(index: number) {
		return this.page.getByTestId(`language-${index}`);
	}

	getRemoveLanguagesBtn(index: number) {
		return this.page.getByTestId(`remove-language-${index}`);
	}
}
