
import {ProductPage} from "../pages/product.page";
import {test,expect} from "../fixtures/adminAuth.fixture";
test('Product Selection with Admin',
    async({adminAuthPage})=>{
    const productPage=new ProductPage(adminAuthPage);
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


});