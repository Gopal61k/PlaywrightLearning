import{test,chromium} from '@playwright/test'

test('browser context demo',async()=>{
//creare browser
const browser=await chromium.launch()

//create context
const context1=await browser.newContext()
const context2=await browser.newContext()

//create page
const context1_page=await  context1.newPage()
const context2_page= await context2.newPage()

//apply waits

await context1_page.waitForTimeout(5000)
await context2_page.waitForTimeout(3000)

//close context
await context1.close()
await context2.close()

//close browser
await browser.close()








})