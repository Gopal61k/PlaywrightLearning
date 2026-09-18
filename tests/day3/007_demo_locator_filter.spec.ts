import{test,expect} from '@playwright/test'

//Execute before each test case
test.beforeEach(async ({ page }) => {
    
 await page.goto("https://sdetqa.vercel.app/filters_practice.html");
})

//Execute after each test cases
test.afterEach(async({page})=>{
    await page.close();
});

//1.Verify add to card product 2
test('Verify add to card product 2',async({page})=>
{
    const productButton2=page.getByRole('listitem').filter({hasText:'Product 1'})
    .getByRole('button',{name:'Add to cart'})

    //Assert 'Add to cart test visile or not
await expect(productButton2).toBeVisible()

//click on add to cart button
await productButton2.click()

//Assert 'Add to cart test visile or not after click
//await expect(productButton2).toBeHidden()
})

test('2.count items nOt having out of stock', async({page})=>
{
/*
Test scenario : Count items not having "Out ofstock"

Step to reproduced:
1. Open the page
2. Go to product list
3. Filter items without "Out ofstock"

Expected result: 3 items should be displayed

*/

//const notInStack=page.getByRole('listitem').filter({hasNotText:"out of stock"});

// await expect(notInStack).toHaveCount(2)  //18

const InStack=page.locator(".card").nth(1)
.getByRole("listitem")
.filter({hasNotText:"out of stock"})

await expect(InStack).toHaveCount(3)

    
})

//TS 3 :find items with in stack ==>3

test.only("TS3 :Find 'In stack 'items ",async({page})=>{
const instackItems=page.getByRole('listitem').filter({hasText:'In stock'})

await expect(instackItems).toHaveCount(3);

})

//verify getByTestId

test("4.verify element having data test id",async({page})=>{
    //located element using test id
    const apple=page.getByTestId('apple')
    const banana=page.getByTestId("banana")
    const orange=page.getByTestId("orange")

    //verify visibility of element
    await expect(apple).toBeVisible()
    await expect(banana).toBeVisible()
    await expect(orange).toBeVisible()

    //verify text contain text(ref locator)
    await expect(apple).toContainText('apple')
    await expect(banana).toContainText("banana")
    await expect(orange).toContainText('orange')

})

//TS 5: verify all count off test ids

test("5.find counts of test ids",async({page})=>{
//get all element using test id
const testIdElements=page.locator('[data-testid1]')

//access different text
const firstElement=testIdElements.first()
const lastElement=testIdElements.last()
const fourthElement=testIdElements.nth(3)

//print all element text
console.log("all fruits.....",await firstElement.innerText(),await lastElement.innerText(),
await fourthElement.innerText()) // 🍏 apple 🥭 mango 🥝 kiwi

//print number of count
await expect(testIdElements).toHaveCount(5);

})

//chaining filter 

test('6.verify "say goodby" text using chaning filter ',async({page})=>{
//Locatoe identify
    const helloButton=page.getByRole('listitem').filter({hasText:'mary'}).getByRole('button',{name:'Say hello'})

//check visibility -toBeVisible()
await expect(helloButton).toBeVisible()
//check text present on UI
await expect(helloButton).toHaveText("Say hello")


// check visibility of john say goodby

const goodByButton=page.getByRole('listitem')
    .filter({hasText:'john'})
    .getByRole('button',{name:'say goodby'})

    await expect(goodByButton).toBeVisible()
    await expect(goodByButton).toHaveText('Say goodbye')
})


//multiple conditions
test('find "details"button of done text',async({page})=>{

const doneTaskDetails=page.getByRole('listitem').filter({hasText:'done'}).getByRole('button',{name:'details'})

await expect(doneTaskDetails).toHaveCount(2)


})
