/*
Keyboard methods:
insertText /type

down
press
up

keyboard.press

await page.keyboard
*/

import { test, expect } from '@playwright/test';


test('keyboard actions', async ({ page }) => {

 await page.goto("https://gotranscript.com/text-compare");
 const textBox1= page.locator('//textarea[@name="text1"]') 

    //1) fous on Full name
    await textBox1.focus();

    //2.enter value
    await page.keyboard.insertText('Welcome')

    //3.ctrl+A -->select all text from textbox1
await page.keyboard.press('Control+A')

//4.crtl+c --> copy text

await page.keyboard.press('Control+C')

//5.Tab --> move to another tab 2
await page.keyboard.press('Tab')

//6.ctrl+V --> paste value in input 2
await page.keyboard.press("Control+V")
 expect(page.locator('//textarea[@name="text2"]')).toHaveValue('Welcome')
})