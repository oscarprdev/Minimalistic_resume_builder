import { Locator, Page } from '@playwright/test';

export class BuilderPage {
	/* Aside */
	readonly aside: Locator;
	readonly infoItem: Locator;
	readonly headerItem: Locator;
	readonly summaryItem: Locator;
	readonly experienceItem: Locator;
	readonly educationItem: Locator;
	readonly languagesItem: Locator;
	readonly skillsItem: Locator;

	readonly asideForm: Locator;

	readonly updateFormButton: Locator;

	/* Viewer */
	readonly resumeTitle: Locator;

	constructor(private readonly page: Page) {
		/* Aside */
		this.aside = this.page.getByTestId('aside');
		this.infoItem = this.page.getByTestId(`aside-item-info`);
		this.headerItem = this.page.getByTestId(`aside-item-header`);
		this.summaryItem = this.page.getByTestId(`aside-item-summary`);
		this.experienceItem = this.page.getByTestId(`aside-item-experience`);
		this.educationItem = this.page.getByTestId(`aside-item-education`);
		this.languagesItem = this.page.getByTestId(`aside-item-languages`);
		this.skillsItem = this.page.getByTestId(`aside-item-skills`);

		this.asideForm = this.page.getByTestId('aside-form');

		this.updateFormButton = this.page.getByRole('button', { name: 'Update' });

		/* Viewer */
		this.resumeTitle = this.page.getByTestId('viewer-resume-title');
	}

	async visitBuilderPage() {
		await this.page.goto('/builder');
	}

	async openAsideForm(item: Locator) {
		await item.click();
	}

	provideDestructiveButton(label: string) {
		return this.page.getByRole('button', { name: label });
	}

	provideFormTitle(section: string) {
		return this.page.getByTestId(`${section}-form-title-field`);
	}

	provideInput(section: string, field: string) {
		return this.page.getByTestId(`${section}-${field}-input`);
	}
}
