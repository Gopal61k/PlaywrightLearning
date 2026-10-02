import{Page,Locator,expect} from '@playwright/test'

export class HomePage
{

    //Defination
    private readonly page:Page;
    private readonly productLinks:Locator;
    private readonly addToCartButton:Locator;
    private readonly cartLink:Locator;
   private readonly categoryLinks:Locator;

    //Initialize constructor

    constructor(page:Page)
    {
        this.page=page;
        this.productLinks=page.locator('div#tbodyid div.card h4.card-title a').nth(2)
        this.addToCartButton=page.locator("//a[contains(text(),'Add to cart')]")
        this.cartLink=page.locator("#cartur")
        this.categoryLinks=page.locator('#.list-group a')
        
    }
 
    //select all product --> one product from all
    async isProductVisible(productName:string)
    {
        const productElements=await this.productLinks.all()
     
        for(const product of productElements)
        {
            const name=await product.textContent()
            if(name?.trim()===productName)
            {
                await product.click()
                return;
            }
        }
        throw new Error(`product"${productName}" not found on this page`)
    }

   

//product action: add product
async addProductToCart(productName:string)
{
    await this.isProductVisible(productName)
    const dialogPromise = this.page.waitForEvent('dialog').then(async dialog => {
        const message = dialog.message()
        await dialog.accept()
        return message
    })
    await this.addToCartButton.click();
    expect((await dialogPromise).toLowerCase()).toContain('added')
}

 //navigate to cart link
    async navigateToCart()
    {
        await this.cartLink.click()
    }

     //select catagories
    async selectCategory(categoryName:string)
    {
        const categories=await this.categoryLinks.all()

        for(const catagory of categories)
        {
            const nameoFcategory=await this.categoryLinks.textContent()
           if (nameoFcategory?.trim().toLowerCase() === categoryName.toLowerCase())
            {
             await catagory.click();
             await this.page.waitForLoadState('networkidle')
             return;
            }
        }
        throw new Error (`category "${categoryName}" not found`)
    }

//wait method
async waitForProductsToLoad()
{
    await this.page.waitForSelector(`dic#tbodyid div.cart`,{state:'visible'})

}
    

}