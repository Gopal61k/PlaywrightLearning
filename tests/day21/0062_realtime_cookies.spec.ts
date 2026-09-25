import{test,expect} from '@playwright/test'
import fs from 'fs';
 
 

//declare global variables: cookies file path and URL
const cookiesFilepath="./storage-data/cookies.data.json"
const appURL='https://sdetqa.vercel.app/login_app'


//make execusion series 

test.describe.configure({mode:'serial'});

//Scenario 1: save cookies 

test('add and save cookies ',async({browser})=>
    {

    //create context
    const context=await browser.newContext()

    //create page
    const page=await context.newPage()

    //launch URL
    await page.goto(appURL)

    //login
    await page.getByLabel('username').fill("admin")
    await page.getByLabel("password").fill('admin123')
    await page.getByLabel(" 🍪 Cookie").check()
    await page.getByRole('button',{name:' Login'}).click()

 //validate dashboard text after login
await expect(page.getByText('Dashboard')).toBeVisible()

 //get all cookies
const cookies=await context.cookies()

 //convert object --> JSON string format -->JSON.stringify :store in jsondata file
fs.writeFileSync(cookiesFilepath, JSON.stringify(cookies, null, 2));
console.log("cookies data successfully store")
 //wait
await page.waitForTimeout(2000)
})

test('login with saved cookies',async({browser})=>{
//browser context
const context=await browser.newContext()

 //read saved cookies from json file
 const savedCookies=JSON.parse(fs.readFileSync(cookiesFilepath,'utf-8'))

 //read data in context

 context.addCookies(savedCookies)

 //create page(())
 const page=await context.newPage()

 //launch URL
 await page.goto(appURL)

 //validate dashboard
 await expect(page.getByText("Dashboard")).toBeVisible()
 


})