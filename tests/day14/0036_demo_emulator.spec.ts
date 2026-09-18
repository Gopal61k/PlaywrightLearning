import{test,expect, devices} from '@playwright/test'

test('emulator test on iphone 15',async({browser})=>{

const context=await browser.newContext({...devices['iphone15']})

const page=await context.newPage()
await page.goto("https://www.google.com")
await page.waitForTimeout(2000)
})

test('emulate test using playwrigth config file',async({page})=>{

/*
 {
  name:'mobile device',
  use:{...devices['iphone15']}
 }

*/

await page.goto('https://www.google.com')


})