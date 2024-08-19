import { Locator, Page } from '@playwright/test';

export class ResumePage {
	readonly header: Locator;
	readonly headerSection: Locator;

	readonly dropdownMenuBtn: Locator;
	readonly openAuthModalBtn: Locator;
	readonly addSectionBtn: Locator;

	readonly authModalContent: Locator;
	readonly addSectionModalContent: Locator;

	constructor(protected page: Page) {
		this.header = this.page.getByTestId('app-header');
		this.headerSection = this.page.getByTestId('header');

		this.dropdownMenuBtn = this.page.getByTestId('dropdown-menu-button');
		this.openAuthModalBtn = this.page.getByTestId('open-auth-modal-button');
		this.addSectionBtn = this.page.getByTestId('add-section-button');

		this.authModalContent = this.page.getByTestId('auth-modal-content');
		this.addSectionModalContent = this.page.getByTestId('add-section-modal-content');
	}

	getSectionButton(name: string) {
		return this.page.getByTestId(`section-${name}-button`);
	}

	getSection(name: string) {
		return this.page.getByTestId(name);
	}
}
