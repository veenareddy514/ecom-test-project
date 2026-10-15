import {Page,Locator} from '@playwright/test';
import {BasePage} from './base.page';
export class LoginPage extends BasePage{
    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;
    constructor(page:Page){
        super(page);
        this.emailInput=page.getByPlaceholder("Your email");
        this.passwordInput=page.getByPlaceholder("Your password");
        this.loginButton=page.getByLabel("Login", { exact: true });

    }
    async goto(){
        await this.page.goto("/auth/login");
    }
    async login(email:string,password:string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
}}