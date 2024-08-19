import { Locator, Page } from '@playwright/test';

export class HeaderSectionPage {
	readonly section: Locator;

	readonly image: Locator;

	readonly addNewLinkBtn: Locator;
	readonly uploadImageBtn: Locator;
	readonly removeImageBtn: Locator;

	constructor(protected page: Page) {
		this.section = this.page.getByTestId('header');
		this.addNewLinkBtn = this.page.getByTestId('add-link');
		this.uploadImageBtn = this.page.getByTestId('upload-image');
		this.removeImageBtn = this.page.getByTestId('remove-image');

		this.image = this.page.getByTestId('header-image');
	}

	getLink(index: number) {
		return this.page.getByTestId(`link-${index}`);
	}

	async uploadImage() {
		const fileChooserPromise = this.page.waitForEvent('filechooser');
		await this.uploadImageBtn.click();
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles(['tests/e2e/mocks/image.webp']);
	}
}
