/*
Aproach to capture screenshot using playwright
1.prigrammatically
2.Globally via playwright config file

*/

import{ test } from '@playwright/test';

//launch browser before each test and navigate to URL
test.beforeEach(async({page})=>{
    await page.goto('https://playwright.dev/');
})

//close browser after each test

test.afterEach(async({page})=>{
    await page.close();
})

//1.screenshot of only visible view point

test('visible viewport screenshot',async({page})=>{

    //scroll to specific page


    //take screenshot of visible viewport
    await page.screenshot({path:'screenshots/01-viewport.png'});
})

//2.full page screenshot
test('full page screenshot',async({page})=>{
    await page.screenshot({path:'screenshots/02-fullpage.png',fullPage:true})

})

//3.JPEG screenshot with quality
test('JPEG screenshot',async({page})=>{
await page.screenshot({path:'screenshots/03-quality.jpg',
    type:'jpeg',
    quality:70

})
   } )

//4.capture specific area(clip)
test('clip screenshot',async({page})=>{
    await page.screenshot({path:'screenshots/04_scpefic_area.png',
        clip:{
            x:100,
            y:130,
            width:700,
            height:400
        }
    })
})

//5.Take screenshot after scrolling
test('screenshot after scrolling',async({page})=>{

    // scrill to specific element
await page.evaluate(()=>{ window.scrollBy(0,500)});

//take screenshot after scrolling
await page.screenshot({path:'screenshots/005_screenshot_after_scrolling.png'})



})




