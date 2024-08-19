import { Locator, Page } from '@playwright/test';

export class SummarySectionPage {
	readonly section: Locator;

	readonly removeSectionBtn: Locator;

	constructor(protected page: Page) {
		this.section = this.page.getByTestId('summary');
		this.removeSectionBtn = this.page.getByTestId('remove-summary');
	}
}
