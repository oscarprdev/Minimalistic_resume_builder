import { LanguagesSectionPage } from '../pages/languages-section.page';
import { test as base } from './resume.fixture';

interface LanguagesSectionFixture {
	languagesSectionPage: LanguagesSectionPage;
}

export const test = base.extend<LanguagesSectionFixture>({
	languagesSectionPage: async ({ page }, use) => {
		await use(new LanguagesSectionPage(page));
	},
});
