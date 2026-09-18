import{test,expect} from '@playwright/test'

test.describe('validate data entry checkboxes',()=>{
const pageURL='https://sdetqa.vercel.app/autoplay.html'

test.beforeEach(async({page})=>
{
 await page.goto(pageURL)

})
 test.afterEach("close all opened browser",async({page})=>
{
    await page.close()

 })

//4.validate check box
test('4.validate check boxes',async({page})=>
{
//select sunday check box

const sundayCheckbox=page.getByLabel('Sun')
sundayCheckbox.check()
await expect(sundayCheckbox).toBeChecked()
await page.mouse.move(0,200)
//select all checkbox
const allDays=['Sun','Mon','Tue','Wed','Thu','Sat']

const allcheckbox=allDays.map((day)=>{
    return page.getByLabel(day)
})

await page.mouse.move(0,200)
//selct one by one check box
for(const checkbox of allcheckbox)
{
    await checkbox.check()
    await expect(checkbox).toBeChecked()

}
 
//select deselect all check box without map
for(const day of allDays)
{
    const checkbox=page.getByLabel(day)
    //deselect
    checkbox.check()
    await expect(checkbox).toBeChecked()

    //select check box
 //   await checkbox.check()
}

//uncheck last 3 option
for(const day of ['Fri','Sat','Sun'])
{
    const checkBBox=page.getByLabel(day)
     checkBBox.check() // tick
    checkBBox.uncheck() // un tick
     await expect(checkBBox).not.toBeChecked()  //validate un tick
}
})
//submit button validation
 test('5. Submit button validation', async ({ page }) => {
    const submitbutton=page.getByRole('button', {name:'Submit'}).first() // capture first Submit button
    //visibility
    await expect(submitbutton).toBeVisible()
    //Click on submit button
    await submitbutton.click()
    //enabled/clickable
    await expect(submitbutton).toBeEnabled()
  
})

  test('6.validate error message',async({page})=>{
    //locator
 const fullnamefield=page.getByLabel("Full name")
 const emailfield=page.getByLabel('Email')
 const phonefield=page.getByLabel('Phone')
 const Address=page.getByLabel('Address')
 const errorMessage=page.locator('#formErrors')
 const submitButton=page.getByRole('button',{name:'submit'}).first()

//  //Entering value
//  fullnamefield.fill('a')
//  emailfield.fill("")
//  phonefield.fill('')
//  Address.fill('')

 //validate error
 await submitButton.click()
 await expect(errorMessage).toBeVisible()
 await expect(errorMessage).toContainText('Full name is required.')

  })

  test('7.Invalide email should shown error message',async({page})=>
{
const emailfield=page.getByLabel('Email')
const submitButton=page.getByRole('button',{name:'submit'}).first()
const errormessage=page.locator('#formErrors')
emailfield.fill('abc@com') //Incorrect Email id
submitButton.click()
await expect(errormessage).toBeVisible()
await expect(errormessage).toContainText("Please enter a valid email address.") //passed
  })

  test('8.Full name should be restricted for more than 15 character',async({page})=>{
const firstnameField=page.getByLabel('Full name')
await firstnameField.fill('ABCDE12345678909XYZ')
await expect(firstnameField).toHaveValue('ABCDE1234567890')
//await expect(firstnameField).toHaveValue('/.{15}/')

//validate number field accept only number value

const phoneField=page.getByLabel('Phone')
phoneField.fill('147852ABCDEF123456')
await expect(phoneField).toHaveValue("/^[^a-zA-Z]$*/")
})
})
