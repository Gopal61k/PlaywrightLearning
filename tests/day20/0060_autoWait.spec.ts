import{test,expect} from '@playwright/test'

test('Auto wait mechanism',async({page})=>{

    test.slow()
//open Url
await page.goto("https://demowebshop.tricentis.com/")


//valicate URL : auto waiting mechanism

await expect(page).toHaveURL("https://demowebshop.tricentis.com/",{timeout:1000})

//validate title
await expect(page).toHaveTitle("Demo Web Shop",{timeout:2000});
await expect(page.locator("text=Welcome to our store")).toBeVisible({timeout:5000})

//enter value in input field

await page.locator('#small-searchterms').fill("laptop")

//click on search button
await page.locator('.search-box-button').click({force:true})


})