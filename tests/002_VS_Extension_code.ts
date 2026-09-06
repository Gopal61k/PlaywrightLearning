import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.naukri.com/');
 
   //login page

 await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email ID / Username' }).fill('gopal.karhale93@gmail.com');
 await page.getByRole('textbox', { name: 'Password' }).click();
 await page.getByRole('textbox', { name: 'Password' }).fill('gopal@1122');

 await page.getByRole('button', { name: 'Login', exact: true }).click();
 await page.getByText('Invalid details. Please check').click();
  
  
  
  
  });
 