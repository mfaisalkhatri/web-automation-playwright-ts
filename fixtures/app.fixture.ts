import { test as base, expect } from '@playwright/test';

import { BasePage } from '../pages/parabank/base-page';
import { OpenNewAccountPage } from '../pages/parabank/open-new-account-page';

type AppFixtures = {
    basePage: BasePage;
    openNewAccountPage: OpenNewAccountPage;
};

export const test = base.extend<AppFixtures>({

    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },

    openNewAccountPage: async ({ page }, use) => {
        const openNewAccountPage = new OpenNewAccountPage(page);
        await use(openNewAccountPage);
    }
});

export { expect } from '@playwright/test';