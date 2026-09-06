import {test,expect} from '@playwright/test'

test('successfullly login Naukri',async({page})=>{

await page.goto('https://www.naukri.com')

setTimeout('5000')
await expect(page.getByRole('heading',{name:'Find your dream job now'})).toBeVisible()

//click on login page
const loginButton=page.getByRole('link',{name:'Login'})
//await expect(loginButton).toBeVisible()
await loginButton.click()

//verify forgate password link on login popup
await page.getByText('Forgot Password?').isVisible()





})