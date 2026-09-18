import{test,expect} from '@playwright/test'

test('page fixture demo',async({page})=>{
     
    await page.goto('https://demowebshop.tricentis.com/');
    await page.click('text=Register');
    await expect(page).toHaveURL(/register/);

});

test('context fixture demo',async({context})=>{
const contextpage=await context.newPage()
await contextpage.goto('https://demowebshop.tricentis.com/')
await expect(contextpage).toHaveURL('https://demowebshop.tricentis.com/')


const context_goglePage=await context.newPage()
await context_goglePage.goto('https://demowebshop.tricentis.com/')
await expect(context_goglePage.getByText('Log in')).toBeVisible()

})

test('Browser fixture demo',async({browser})=>{

    const context_google=await browser.newContext()
    const browserPage=await context_google.newPage()

     await browserPage.goto('https://demowebshop.tricentis.com/')
     await expect(browserPage).toHaveURL('https://demowebshop.tricentis.com/')

await context_google.close()
await browser.close()
})