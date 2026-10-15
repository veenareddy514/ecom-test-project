import {test as base,expect,Page} from '@playwright/test';
import {LoginPage} from '../pages/login.page';
//simple fixture that provide an authenticated admin user login state for tests
export const test=base.extend<{adminAuthPage:Page}>({
     adminAuthPage:async({browser},use)=>{
         const storageStatePath=".auth/adminStorageState.json";
         const setUpContext=await browser.newContext();
         const setupPage=await setUpContext.newPage();
         const loginPage=new LoginPage(setupPage);
         await loginPage.goto();
         const email=process.env.ADMIN_EMAIL!;
         const password=process.env.ADMIN_PASSWORD!;
         await loginPage.login(email,password);
         await expect(loginPage.navMenu).toContainText("Cba");
         await setUpContext.storageState({path:storageStatePath});
         await setUpContext.close();
         //Create a new context with the saved storage state
         const newContext=await browser.newContext({storageState:storageStatePath});
         const newPage=await newContext.newPage();
         await use(newPage);
         await newContext.close();
         },

});
export {expect} from '@playwright/test';
