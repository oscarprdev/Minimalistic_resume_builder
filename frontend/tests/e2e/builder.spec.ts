import { test, expect } from '@playwright/test';
import { BuilderPage } from './pages/builder.page';
import { SECTION_CONTROL } from '@/app/(screens)/builder/components/_utils/sections';

test.describe('Builder page', () => {
	let builderPage: BuilderPage;

	test.beforeEach(async ({ page }) => {
		builderPage = new BuilderPage(page);
		await builderPage.visitBuilderPage();
	});

	test('Aside section should be visible', async () => {
		await expect(builderPage.aside).toBeVisible();
		await expect(builderPage.infoItem).toBeVisible();
		await expect(builderPage.infoItem).toHaveText('Resume config');

		await expect(builderPage.headerItem).toBeVisible();
		await expect(builderPage.headerItem).toHaveText('Personal information');

		await expect(builderPage.summaryItem).toBeVisible();
		await expect(builderPage.summaryItem).toHaveText('Professional summary');

		await expect(builderPage.experienceItem).toBeVisible();
		await expect(builderPage.experienceItem).toHaveText('Experience');

		await expect(builderPage.educationItem).toBeVisible();
		await expect(builderPage.educationItem).toHaveText('Education');

		await expect(builderPage.languagesItem).toBeVisible();
		await expect(builderPage.languagesItem).toHaveText('Languages');

		await expect(builderPage.skillsItem).toBeVisible();
		await expect(builderPage.skillsItem).toHaveText('Skills');
	});

	test.describe('Info section', () => {
		const section = SECTION_CONTROL.INFO;

		test.beforeEach(async () => {
			await builderPage.openAsideForm(builderPage.infoItem);
			await expect(builderPage.asideForm).toBeVisible();
		});

		test('Info form should have the expected fields', async () => {
			const formTitle = builderPage.provideFormTitle(section);
			await expect(formTitle).toBeVisible();

			await expect(builderPage.updateFormButton).toBeVisible();
			const destructiveBtn = builderPage.provideDestructiveButton('Delete resume');
			await expect(destructiveBtn).toBeVisible();
			await expect(destructiveBtn).toBeDisabled();
		});

		test('Once form is fullfilled, viewer page should be updated', async () => {
			await expect(builderPage.resumeTitle).toBeVisible();
			await expect(builderPage.resumeTitle).toHaveText('Your resume title');

			const inputTitle = builderPage.provideInput(section, 'title');

			await expect(inputTitle).toBeVisible();
			const inputValue = 'Some title';
			await inputTitle.fill(inputValue);

			await builderPage.updateFormButton.click();

			await expect(builderPage.resumeTitle).toHaveText(inputValue);
		});
	});
});
