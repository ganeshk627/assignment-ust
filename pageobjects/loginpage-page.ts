import { type Locator, type Page, expect } from "@playwright/test";



export class LoginPage {

    //variables
    protected readonly page: Page;
    private readonly USERNAME: Locator;
    private readonly PASSWORD: Locator;
    private readonly ERROR_MESSAGE: Locator;
    private readonly LOGIN_BUTTON: Locator;
    private readonly HEADER_LABEL: Locator;



    //constructor
    constructor(page: Page) {
        this.page = page;
        this.USERNAME = page.locator('#user-name');
        this.PASSWORD = page.locator('//input[@id="password"]');
        this.ERROR_MESSAGE = page.locator('//h3[@data-test="error"]');
        this.LOGIN_BUTTON = page.locator('[data-test="login-button"]');
        this.HEADER_LABEL = page.locator('.app_logo');
    }

    // methods
    async login(username: string, password: string) {
        await this.USERNAME.fill(username);
        await this.PASSWORD.fill(password);
        await this.LOGIN_BUTTON.click();
    }

    async validate_role(role: string) {
        console.log(`The role is ${role}`)
        if(role==='standard_user'|| role==='error_user'|| role==='visual_user') {
            await expect(this.page).toHaveURL('/inventory.html')
            await expect(this.HEADER_LABEL).toBeVisible()
        } else if(role==='performance_glitch_user') {
            await expect(this.page).toHaveURL('/inventory.html')
            await expect(this.HEADER_LABEL).toBeVisible()
        } else if(role==='locked_out_user') {
            await expect(this.page).not.toHaveURL('/inventory.html')
            await expect(this.ERROR_MESSAGE).toHaveText('Epic sadface: Sorry, this user has been locked out.')
            await expect(this.HEADER_LABEL).not.toBeVisible()

        } else {
            throw new Error('Please provide valid role!!!')
        }
    }

}