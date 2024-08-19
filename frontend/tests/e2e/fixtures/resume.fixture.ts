import { ResumePage } from '../pages/resume.page';
import { test as base } from 'playwright/test';

interface ResumeFixture {
	resumePage: ResumePage;
	navigateToApp(): Promise<void>;
}

export const test = base.extend<ResumeFixture>({
	resumePage: async ({ page }, use) => {
		await use(new ResumePage(page));
	},
	navigateToApp: async ({ page }, use) => {
		await use(async (): Promise<void> => {
			await page.goto(`/`);
		});
	},
});
