import {test,expect} from "@playwright/test"

test("playwright locator",async({page})=>{
await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html")

//1.getByRole
const singButton=page.getByRole("button",{name:'Sign In'});
await expect(singButton).toBeVisible();

const checkbox=page.getByRole('link',{name:'Projects'})
await expect(checkbox).toBeVisible();

//LOcator 2: geyByText()

const welcome_text=page.getByText('Welcome, John! 👋')
await expect(welcome_text).toBeVisible();

const welcome_lbl=page.getByText('Welcome, John! 👋',{exact:true})
await expect(welcome_lbl).toBeVisible()


//locator 3: getByLabel

//enter first name using Label locator
const first_nameLabel=page.getByLabel('First Name')
await expect(first_nameLabel).toBeVisible()

//enter data in first name field
await first_nameLabel.fill("gopal")

//Enter last name using Label locator

await page.getByLabel('Last Name').fill('karhale')

//enter email id using label
await page.getByLabel('Email Address').fill("gopal@gmail.com")

//enter mobile number using label
await page.getByLabel('Phone Number').fill('796566222')


//Locator 4: placeholder...
//  placeholder="Search tests..."

await page.getByPlaceholder('Search tests...').fill('test')

await expect(page.getByPlaceholder('Search tests...')).toBeVisible()


//locator 5: locate by alt text
//<img alt='playwright logo>

page.getByAltText('Playwright logo').isVisible()

const Img_alt_puppy=page.getByAltText('Red apple fruit');
await expect(Img_alt_puppy).toBeVisible()


//6.Title Attribute Locators
 await page.getByTitle('Total test runs').textContent();

await page.getByTitle('Tests passed today').textContent()


//7. Test id locator

await page.getByTestId('product-card-pro').click()



const search_loc=page.getByTestId('search-input');
await expect(search_loc).toBeVisible()
await search_loc.click()

await search_loc.fill("playwright automation")














})