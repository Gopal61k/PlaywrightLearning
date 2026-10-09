import {test,expect} from '@playwright/test'
const loginTestData: string[][]=[
     ["laura.taylor1234@example.com", "test123", "valid"],
    ["invaliduser@example.com", "test321", "invalid"],
    ["validuser@example.com", "testxyz", "invalid"],
    ["", "", "invalid"],
]
// for loop for iterating through the test data
for(const [email,password,validity] of loginTestData)
{
    // describe block for grouping the tests
 test.describe('login data driver test',async()=>{

    // test block for each test case
    test(`login test for ${email} and ${password}`,async({page})=>{
    
await page.goto('https://demowebshop.tricentis.com/login')
//fill form
await page.locator('#Email').fill(email)
await page.locator('#Password').fill(password)
await page.getByRole('button', { name: 'Log in' }).click()

if(validity.toLocaleLowerCase()=='valid')
{
    //assert logout link is visible - indicates successful login
    const logoutlink=page.locator('a[href="/logout"]')
    await expect(logoutlink).toBeVisible({timeout:5000})
}

else{
    //error message is visible on screen -invalide data
    const errormessage=page.locator('.validation-summary-errors')
    await expect(errormessage).toBeVisible({timeout:5000})
    //assert user is still on login page
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/login')
    

}


    })

 })
    

}