import{test,expect} from '@playwright/test'

test.describe('all login features',()=>{

    const URL="https://demowebshop.tricentis.com/"

    test.beforeEach(async({page})=>{
        await page.goto(URL)
    })
    test.afterEach(async({page})=>{
        await page.close()
    })
    
test('CSS with id',async({page})=>{
  //  await page.goto("https://demowebshop.tricentis.com/")
   const searchBox_id= page.locator('#small-searchterms')
   searchBox_id.fill("14.1-inch Laptop")

   //click on search using attribute value
   await page.locator('[type="submit"]').click()

   await expect(page.locator('h2[class="product-title"]')).toHaveText('14.1-inch Laptop')

   await page.close()

});

test('Css eith class,attribute value',async({page})=>
{
    //launch URL
  ////  await page.goto("https://demowebshop.tricentis.com/")
//find locator with class
   const searchbox=page.locator('[value="Search store"]')
    searchbox.fill("14.1-inch Laptop")

    await page.locator('[value="Search"]').click()

    //find out text 

    await expect(page.locator('h2[class="product-title"]')).toHaveText('14.1-inch Laptop')

 await page.close()

})

test('CSS with class+Attribute',async({page})=>{

   // await page.goto("https://demowebshop.tricentis.com/")

    const searchbox=page.locator('.search-box-text[value="Search store"]')
    searchbox.fill("14.1-inch Laptop")

    await page.locator('[value="Search"]').click()

    //find out text 

    await expect(page.locator('h2[class="product-title"]')).toHaveText('14.1-inch Laptop')
})

})