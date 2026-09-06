/*
1) Got to Url: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
2) Enter user name and password ( Admin, admin123)
3) Click on login
4) Check Dashboard is visible after login
?
*/

import {test,expect,Locator } from "@playwright/test"
test('successfully login page',async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    //using placeholder identify elements

    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')

    //click on login button using getByRole() locator
    await page.getByRole('button',{name:' Login '}).click()



})

 

