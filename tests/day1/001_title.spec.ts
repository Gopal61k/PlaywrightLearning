import { test, expect } from '@playwright/test';


test("title of site",async({page})=>{

    page.goto("https://www.google.com/")
    expect(page).toHaveTitle(/Google/)

})