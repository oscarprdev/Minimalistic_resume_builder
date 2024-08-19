import { SummarySectionPage } from '../pages/summary-section.page';
import { test as base } from './resume.fixture';

interface SummarySectionFixture {
	summarySectionPage: SummarySectionPage;
}

export const test = base.extend<SummarySectionFixture>({
	summarySectionPage: async ({ page }, use) => {
		await use(new SummarySectionPage(page));
	},
});
