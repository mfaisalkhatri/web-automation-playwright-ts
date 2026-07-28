import { test as base } from '@playwright/test';

import { BasePage } from '../pages/parabank/base-page';
import { RegistrationPage } from '../pages/parabank/registration-page';
import { OpenNewAccountPage } from '../pages/parabank/open-new-account-page';
import { UserData } from '../test-data/UserData';

type AppFixtures = {
    basePage: BasePage;
    registrationPage: RegistrationPage;
    openNewAccountPage: OpenNewAccountPage;
    userData: UserData;
};

export const test = base.extend<AppFixtures>({

    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
    registrationPage: async ({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },

    openNewAccountPage: async ({ page }, use) => {
        const openNewAccountPage = new OpenNewAccountPage(page);
        await use(openNewAccountPage);
    },

    userData: async ({ }, use) => {
        const userData = new UserData();
        await use(userData);
    },
});

export { expect } from '@playwright/test';