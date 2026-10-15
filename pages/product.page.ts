import {Page,Locator} from '@playwright/test';
import {BasePage} from './base.page';
export class ProductPage extends BasePage{
    readonly productCards:Locator;
    readonly productName:Locator;
    readonly addToCartButton:Locator;
    readonly addedToCartMessage:Locator;
    constructor(page:Page){
        super(page);
        this.productCards=page.locator(".card");
        this.productName=page.getByTestId("product-name");
        this.addToCartButton=page.getByRole("button",{name:'Add to cart '});
        this.addedToCartMessage=page.getByLabel("Product added to shopping cart");
    }
    async goto(productId:string){
        await this.page.goto(`/product/${productId}`);
    }
    async clickProductByIndex(index:number){
        const product=this.productCards.nth(index);
        await product.click();
    }



}

