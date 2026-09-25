import { test, expect } from "@playwright/test";

test("soft assertion", async ({ page }) => {
  await page.goto("https://www.google.com/");

  // validate URL
  expect.soft(page).toHaveURL("https://www.google.com1/"); //failed assetion

  // validate title
  expect.soft(page).toHaveTitle("Google");   //passed assertion

  const googleLogo = page.getByRole("img", { name: "Google" });

  await expect(googleLogo).toBeVisible();  //psssed assertion

  console.log("soft assertion completed");
});


//2.Hard assertion

test("Hard assertion",async({page})=>{

    await page.goto("https://www.amazon.in/");


    //validate URL
    expect(page).toHaveURL("https://www.amazon.in/")

    //validate title
    expect(page).toHaveTitle("1Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in")

    //validate logo
    const amazonLogo = page.getByRole('link',{name:"Amazon.in"});
    await expect(amazonLogo).toBeVisible();


})