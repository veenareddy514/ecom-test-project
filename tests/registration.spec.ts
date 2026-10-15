import {test,expect} from '@playwright/test';
import {createUser,createInvalidUser,createDOB} from '../data/factory';
import {RegistrationPage} from '../pages/registration.page';
test.describe('Practice Software Testing site tests',async()=> {
    let user: any;
    let invalidUser: any;
    test.use({storageState: undefined});
    test.beforeEach(async () => {
        invalidUser = createInvalidUser();
        user = createUser();


    });
    test("Successful user Registration", async ({page}) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.goto();
        //await registrationPage.clearStorage(page);

        await registrationPage.fillpersonnelInfo(user.firstName, user.lastName, user.dob);
        await registrationPage.fillContactInfo(user.phone,user.email);
        await registrationPage.fillAddressInfo(user.country,user.zip,user.houseNumber,user.streetAddress,
            user.city,user.state);
        await registrationPage.fillPassword(user.password);
        const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/users/register") && response.status() === 201
    );
        await registrationPage.submitRegistrationForm();
        await responsePromise;
        await expect(page).toHaveURL(/auth\/login/);



    });
    test("Negative Registration with Invalid Data",async({page})=>{
        const registrationPage=new RegistrationPage(page);
        await registrationPage.goto();
        await registrationPage.firstNameInput.fill(invalidUser.firstName);
        await registrationPage.dobInput.fill(invalidUser.dob);
        await registrationPage.passwordInput.fill(invalidUser.password);
        await registrationPage.submitRegistrationForm();
        await expect(page.getByText("First name is required")).toBeVisible();
        await expect(page.getByText("Please enter a valid date")).toBeVisible();
        await expect(page.getByText("Password must be minimal 6 characters long.")
    ).toBeVisible();





    })


})
