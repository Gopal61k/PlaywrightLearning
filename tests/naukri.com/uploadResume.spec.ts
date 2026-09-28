import{test,expect} from "@playwright/test"
 
test("upload resume in naukri ",async({page})=>
{
    await page.goto("http://www.naukri.com")

    //login locator
    await page.getByTitle('Jobseeker Login').click()

    await page.getByLabel("Username").fill("gopalkarhale1@outlook.com")
    await page.getByPlaceholder('Enter your password').fill("Gopal@1122")
    
    //locator of login Button and click
const loginButton = page.getByRole('button',{ name: 'Login',exact:true});
await loginButton.click();

//validate URL
await expect(page).toHaveURL("https://www.naukri.com/mnjuser/homepage")

//upload resume
await page.getByLabel('Open profile menu').click()
await page.getByRole('link',{name:'View & Update Profile'}).click()






// Start listening for file chooser BEFORE clicking Update resume
  const fileChooserPromise = page.waitForEvent('filechooser');

  // Click Update resume
  await page.getByRole('button', {
    name: 'Update resume'
  }).click();
 
  // Get file chooser
  const fileChooser = await fileChooserPromise;

  // Upload resume
  await fileChooser.setFiles('uploads/Gopal_Karhale_QA_Test_Engg.pdf');








})