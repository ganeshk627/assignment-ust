import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/loginpage-page';

const login_datas = [
  {"username":"standard_user", "password":"secret_sauce", "role":"standard_user"},
  {"username":"locked_out_user", "password":"secret_sauce", "role":"locked_out_user"},
  {"username":"performance_glitch_user", "password":"secret_sauce", "role":"performance_glitch_user"},
  {"username":"error_user", "password":"secret_sauce", "role":"error_user"},
  {"username":"visual_user", "password":"secret_sauce", "role":"visual_user"},
]

login_datas.forEach( login_data => {

  test(`Login with Multiple Roles ${login_data.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Opening Saucelab page', async () => {
      await page.goto('/');
    });

    await test.step('Logging with username and password', async () => {
      await loginPage.login(login_data.username, login_data.password);
    });

    await test.step('Validating role', async () => {
      await loginPage.validate_role(login_data.role);
    });

  });
});



