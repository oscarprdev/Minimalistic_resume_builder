import { test } from './fixtures/resume.fixture';
import { SectionSelected } from '@/app/components/types/types';
import { expect } from '@playwright/test';

test.describe('Resume page', () => {
	test.beforeEach(async ({ page, navigateToApp }) => {
		await navigateToApp();
	});

	test('Header should be visible', async ({ resumePage }) => {
		await expect(resumePage.header).toBeVisible();
		await expect(resumePage.dropdownMenuBtn).toBeVisible();
	});

	test('Auth modal should be visible on click on sign in button', async ({ resumePage }) => {
		await expect(resumePage.dropdownMenuBtn).toBeVisible();

		await resumePage.dropdownMenuBtn.click();
		await expect(resumePage.openAuthModalBtn).toBeVisible();

		await resumePage.openAuthModalBtn.click();
		await expect(resumePage.authModalContent).toBeVisible();
	});

	test('Resume sections should be added by selecting them on section modal', async ({ resumePage }) => {
		await expect(resumePage.headerSection).toBeVisible();
		await expect(resumePage.addSectionBtn).toBeVisible();

		resumePage.addSectionBtn.click();
		await expect(resumePage.addSectionModalContent).toBeVisible();

		for (const sectionName of Object.values(SectionSelected)) {
			const button = resumePage.getSectionButton(sectionName);

			await expect(button).toBeVisible();
			button.click();

			const section = resumePage.getSection(sectionName);
			await expect(section).toBeVisible();

			if (sectionName !== SectionSelected.languages) {
				resumePage.addSectionBtn.click();
			}
		}
	});
});
