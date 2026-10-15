import {test,expect} from '@playwright/test';
import {ProductPage} from '../pages/product.page';
import {LoginPage} from '../pages/login.page';

test("Add Product to cart",async ({page})=>{
    const productPage=new ProductPage(page);
    await productPage.gotoHome();
    await productPage.selectCategory("Hand Tools");
    await productPage.clickProductByIndex(1);
    await expect(productPage.productName).toHaveText("Pliers");
    await productPage.addToCartButton.click();
    await expect(productPage.addedToCartMessage).toContainText(
        "Product added to shopping cart"
    );
    //wait for the message to disappear
    await expect(productPage.addedToCartMessage).not.toBeVisible({timeout:10000});
    await expect(productPage.navCartQuantity).toHaveText("1");




})