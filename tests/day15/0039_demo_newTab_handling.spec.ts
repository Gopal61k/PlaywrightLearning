import{test,expect} from '@playwright/test'

test('demo single tan handling',async({browser})=>{
 
    //create context
   const context=await browser.newContext()

   //page
   const page=await context.newPage()

   //launch URL
   await page.goto('https://sdetqa.vercel.app/autoplay')

   //navigate to new tab
    const [newTab]=await Promise.all(

        [
            //overwait
            context.waitForEvent('page'),
            page.locator('button',{hasText:'New Tab'}).click()
        ]
    )
    //old page url
    console.log('old page URL:',await page.title())
   const title= await newTab.title();
   console.log("title of new tab:",title)

   await expect(newTab).toHaveTitle(/Playwright/)

   //validate URL 
    await expect(page).toHaveURL(/sdetqa/)
    await expect(newTab).toHaveURL(/playwright.dev/)
})

//multiple window handles

test('multiple window handles',async({browser})=>{

    const context=await browser.newContext()
    const mainPage=await context.newPage()

    //launch URL
    await mainPage.goto('https://sdetqa.vercel.app/autoplay')

    //handle windows

    const [windows]=await Promise.all(
        [
            context.waitForEvent('page'),
            await mainPage.locator('#window').click()
        ]
    )

    //number of pages
    console.log('number of pages:',context.newPage.length)
 console.log('new window title is: ',await windows.title())

 //assertion
 await expect(windows).toHaveURL(/playwright.dev/)
 await expect(windows).toHaveTitle(/reliable /)


})