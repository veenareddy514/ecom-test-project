import {Page,Locator} from '@playwright/test';
import {BasePage} from './base.page';
export class RegistrationPage extends BasePage{
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly dobInput:Locator;
    readonly country:Locator;
    readonly postalCodeInput: Locator;
    readonly HouseNumberInput: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly StateInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerInput: Locator;

    constructor(page:Page){
        super(page);
        this.firstNameInput=page.getByPlaceholder("First name *");
        this.lastNameInput=page.getByPlaceholder("Your last name *");
        this.dobInput=page.getByTestId("dob");
        this.country=page.getByRole("combobox",{name:'country'});
        this.postalCodeInput=page.locator("#postal_code");
        this.HouseNumberInput=page.getByRole("textbox",{name:'House number'});
        this.streetInput=page.getByTestId("street");
        this.cityInput=page.getByTestId("city");
        this.StateInput=page.getByTestId("state");
        this.phoneInput=page.getByPlaceholder("Your phone *");
        this.emailInput=page.getByPlaceholder("Your email *");
        this.passwordInput=page.getByPlaceholder("Your password");
        this.registerInput=page.getByRole("button",{name:'Register'});
    }
    async  goto()
    {
        await this.page.goto("/auth/register");

    }
    async fillpersonnelInfo(firstName:string,lastName:string,dob:string){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.dobInput.fill(dob);
    }
    async fillAddressInfo(country:string,postalCode:string, houseNumber: string,street:string,city:string,state:string){
        await this.country.selectOption(country);
        await this.postalCodeInput.fill(postalCode);
        await this.HouseNumberInput.fill(houseNumber);

        await this.streetInput.fill(street);
        await this.cityInput.fill(city);
        await this.StateInput.fill(state);

    }
    async fillContactInfo(phone:string,email:string){
        await this.phoneInput.fill(phone);
        await this.emailInput.fill(email);

    }
    async fillPassword(password:string){
        await this.passwordInput.fill(password);
    }
    async submitRegistrationForm(){
        await this.registerInput.click()
    }
    //complete registration method that accepts a user object and fills the form and submits it
    async registerUser(user:{firstName:string,LastName:string,dob:string,country:string,postalCode:string,houseNumber:string,street:string,city:string,state:string,phone?:string,email:string,password:string}){
        await this.fillpersonnelInfo(user.firstName,user.LastName,user.dob);
        await this.fillAddressInfo(user.country,user.postalCode,user.houseNumber,user.street,user.city,user.state);
        await this.fillContactInfo(user.phone||"",user.email);
        await this.fillPassword(user.password);
        await this.submitRegistrationForm();
    }


}