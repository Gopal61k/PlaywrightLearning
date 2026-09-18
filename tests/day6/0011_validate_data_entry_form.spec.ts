import{test,expect} from '@playwright/test'

const pageURL="https://sdetqa.vercel.app/autoplay"

//test suite
test.describe("validate data entry application",()=>{
test.beforeEach(async({page})=>{
await page.goto(pageURL)
})

//1.validate load page and URL
test('validate loading page',async({page})=>{
    //validate URL
await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay")
//validate Autoplay test after launching URL
await expect(page.getByText('AutoPlay')).toBeVisible()

//Get Title of web Page
await expect(page).toHaveTitle("Web Automation Playground")
})

test("2.input field validation",async({page})=>{

    const nameField=page.getByLabel('Full name')
    const emailfield=page.getByLabel('Email')
    const phonefield=page.getByLabel('Phone')
    const address=page.getByLabel('Address')

    //full name should be visible and enable
    await page.waitForTimeout(5000)
await expect(nameField).toBeVisible()
//await expect(nameField).toBeDisabled()

//Verify max length attribute -should be 15

await expect(nameField).toHaveAttribute('maxlength','15')

//entet and check full name

await nameField.fill("john canady")
await expect(nameField).toHaveValue("john canady")

//enter email id and validate
await expect(emailfield).toBeVisible()
emailfield.fill('gopal@gmail.com')
await expect(emailfield).toHaveValue('gopal@gmail.com')


//enter phone number
await phonefield.fill("+91 446565111")
await expect(phonefield).toHaveValue("+91 446565111")

//enter address and re check
await address.fill("123 abc \n pune maharashtra")
await expect(address).toHaveValue('123 abc \n pune maharashtra')

})
 
test('3.Radio button validation',async({page})=>{
const maleRadio=page.getByLabel('Male',{exact:true})
const femaleRadio=page.getByLabel('Female',{exact:true})

//check visibility of radio button
await expect(maleRadio).toBeVisible()
await expect(femaleRadio).toBeVisible()

//Select :Female radio button  and verify
//click on radio button
femaleRadio.check() //click on Female radio button
//verify female radio button checked
await expect(femaleRadio).toBeChecked()

//verify uncheck Male radio button

await expect(maleRadio).not.toBeChecked()



})

})