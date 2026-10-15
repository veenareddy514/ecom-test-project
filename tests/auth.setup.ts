import {test as setup,expect} from '@playwright/test';
import {LoginPage} from '../pages/login.page';
setup("Create Customer 1 Authentication",async ({page})=>{
    const email=process.env.CUSTOMER_1_EMAIL || "";
    console.log(email);
    const password=process.env.CUSTOMER_1_PASSWORD || "";
    console.log(password);
    const customer1AuthFile = ".auth/customer1StorageState.json";
    const loginPage=new LoginPage(page);
    await loginPage.gotoHome();
    await loginPage.navMenuSignIn.click();
    await loginPage.login(email,password);
    //Verify Login was successful
    await expect(loginPage.navMenu).toContainText("Jane");
    //Save the storage state to a file
    await page.context().storageState({path:customer1AuthFile});






    ""
})
