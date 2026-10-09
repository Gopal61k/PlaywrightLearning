//2  approach to capture videos in playwright
//1.programmatically via browser context
//2.globally via playwright config file

import{test,chromium,expect} from '@playwright/test'

 test('Record Video for Single Test',async({},testInfo)=>
{
    //browser
    const browser=await chromium.launch()

    //browser context fixture
    const context=await browser.newContext
    ({
        recordVideo:{
            dir:'videos/',
            size:{
                width:1250,
                height:720
            }
        }
    })
//page fixture
const page=await context.newPage()

//launch browser
await page.goto('https://www.demoblaze.com/index.html')

//click on login link
await page.getByRole('link',{name:"Log in"}).click()

//enter username and password then click on login button
await page.locator('#loginusername').fill('Gopal1122');
await page.locator('#loginpassword').fill('Gopal1122')
await page.getByRole('button',{name:'Log in'}).click()

//click on logout link and verify the user is logged in successfully
await expect(page.getByRole('link',{name:'Log out'})).toBeVisible()

//validate the welcome message
await expect(page.locator('#nameofuser')).toContainText('Welcome goal1122')


await context.close()  //video file will be saved

 //Attach the video tohtml report

 const videoPath=await page.video()?.path() //get save video path

 await testInfo.attach('Execution Video',
 {
    path :videoPath,
    contentType:'video/webm',

 })
 await browser.close()




 })