/*

3 Approaches to capture Trace file in Playwright:

1. Programatically (Start and stop tracing manually within a test.) 
2. Configure tracing in playwright.config.ts (used in most real projects).
3. using CLI command


*/

import{test,chromium,expect} from '@playwright/test'

test('capture trace Manually',async({page}, testInfo) =>{
    const browser=await chromium.launch()
    const context=await browser.newContext()

    //start tracing
    await context.tracing.start(
    {
        screenshots:true,
        snapshots:true,
        sources:true
    })

//page fixture
const Page=await context.newPage()

//launch browser
await Page.goto("https://www.demoblaze.com/index.html")
await Page.getByRole('link',{name:'Log in'}).click()
//enter username and password
await Page.locator('#loginusername').fill('Gopal1122')
await Page.locator('#loginpassword').fill('Gopal1122') //password incorrect
await Page.getByRole('button',{name:'Log in'}).click()

//assertion
await expect(page.getByRole('link',{name:'Log out'})).toBeVisible() 
await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol')

const tracePath='traces/trace-$(Date.now()).zip' //will use this path later to attach to report
await context.tracing.stop({
    path:tracePath
})
await testInfo.attach('Playwright Trace',{
    path:tracePath,
    contentType:'application/zip'
})
await browser.close()

})