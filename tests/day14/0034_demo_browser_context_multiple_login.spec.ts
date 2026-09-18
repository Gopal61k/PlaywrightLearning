import{test,chromium, expect} from '@playwright/test'

test('browser context_multiple_user',async()=>{

    //create browser
    const browser=await chromium.launch()

    //user 1 : admin context

    const admincontext=await browser.newContext()
    const adminpage=await admincontext.newPage()

    //user 2: customer context
    const customerContext=await browser.newContext()
    const customerPage=await customerContext.newPage()

//login with admin user credential

await adminpage.goto('https://www.saucedemo.com/')
await adminpage.getByPlaceholder('Username').fill('standard_user')
await adminpage.locator('#user-name').fill('secret_sauce')
await adminpage.locator('#login-button').click()
await adminpage.waitForTimeout(3000)
//Swag Labs-check text present on UI page
await expect(adminpage.getByText('Swag Labs')).toBeVisible()

//login with another user

await customerPage.goto('https://www.saucedemo.com/')
await customerPage.getByPlaceholder('Username').fill('visual_user')
await customerPage.locator('#password').fill('secret_sauce')
await customerPage.locator('#login-button').click()
await customerPage.waitForTimeout(2000)

//close context and browser
await admincontext.close()
await customerContext.close()

await browser.close()


})