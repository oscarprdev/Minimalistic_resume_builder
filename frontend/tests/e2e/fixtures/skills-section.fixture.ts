import { SkillsSectionPage } from '../pages/skills-section.page';
import { test as base } from './resume.fixture';

interface SkillsSectionFixture {
	skillsSectionPage: SkillsSectionPage;
}

export const test = base.extend<SkillsSectionFixture>({
	skillsSectionPage: async ({ page }, use) => {
		await use(new SkillsSectionPage(page));
	},
});
