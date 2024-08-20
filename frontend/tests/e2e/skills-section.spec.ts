import { test } from './fixtures/skills-section.fixture';
import { expect } from '@playwright/test';

test.describe('Skills section', () => {
	test.beforeEach(async ({ navigateToApp, resumePage, skillsSectionPage }) => {
		await navigateToApp();

		await expect(resumePage.addSectionBtn).toBeVisible();

		await resumePage.addSectionBtn.click();
		await expect(resumePage.addSectionModalContent).toBeVisible();
		const sectionBtn = resumePage.getSectionButton('skills');

		await sectionBtn.click();

		await expect(skillsSectionPage.section).toBeVisible();
	});

	test('Skills section should be successfully removed', async ({ skillsSectionPage }) => {
		await skillsSectionPage.section.hover();
		await expect(skillsSectionPage.removeSectionBtn).toBeVisible();
		await skillsSectionPage.removeSectionBtn.click();

		await expect(skillsSectionPage.section).not.toBeVisible();
	});

	test('Skills should be successfully added', async ({ skillsSectionPage }) => {
		await skillsSectionPage.section.hover();
		await expect(skillsSectionPage.addSkillsBtn).toBeVisible();

		const skills = skillsSectionPage.getSkills(0);
		await expect(skills).toBeVisible();

		await skillsSectionPage.addSkillsBtn.click();

		const skills2 = skillsSectionPage.getSkills(1);
		await expect(skills2).toBeVisible();
	});

	test('Skills should be successfully removed', async ({ skillsSectionPage }) => {
		await skillsSectionPage.section.hover();

		const skills = skillsSectionPage.getSkills(0);
		await expect(skills).toBeVisible();

		const removeSkillsBtn = skillsSectionPage.getRemoveSkillsBtn(0);
		await removeSkillsBtn.click();

		await expect(skills).not.toBeVisible();
	});
});
