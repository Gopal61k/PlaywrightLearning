import{test,expect} from '@playwright/test'


test('locator of xpath',async({page})=>{

    await page.goto('https://demowebshop.tricentis.com/')
    //XPATH BY Contains()
const logo= page.locator("//html/body/div[4]/div[1]/div[1]/div[1]/a/img")
//await page.waitForTimeout(5000)
await expect(logo).toBeVisible()

//Relative Xpath

const relativeLogo=page.locator("//img[@alt='Tricentis Demo Web Shop']")
await expect(relativeLogo).toBeVisible()

//xpath with contains()

const products=page.locator("//h2//a[contains(@href,'computer')]");

//print number of count
const productCount=products.count()

console.log(products.count())

//validate product more than 1
  expect(await productCount).toBeGreaterThan(0)

  //Print first Product
  console.log( await products.nth(1).textContent()) //Build your own computer

  //print all products

  console.log(await products.allTextContents())
  /*
  output:
  [
  'Build your own cheap computer',
  'Build your own computer',
  'Build your own expensive computer',
  'Simple Computer'
]
  */
 //4.xpath starts-with()
//Element Located
 const buidingProduct=page.locator(`//h2/a[starts-with(@href,'/build')]`)

 //count of products
 console.log("Number of count of productBulding: ", await buidingProduct.count()) //3

 //validate count greaterthan >0
 const count=await buidingProduct.count()
  //assertion
expect(count).toBeGreaterThan(0)
expect(count).toBe(3)

//5.xpath with text()

let registerlink=page.locator("//a[text()='Register']")
await expect(registerlink).toBeVisible()
console.log(await registerlink.textContent())  //Register

//6.xpath with last()
console.log("************xpath with Last()*********")
let wishlist=await page.locator(`//div[@class='column my-account']//li[last()]`).textContent()
expect(wishlist).toBe('Wishlist')
console.log(wishlist)

//7.xpath with position()

console.log("***************xapth with position()***********")

let shopingcarts=await page.locator(`//div[@class='column my-account']//li[position()=4]`).textContent()
 expect(shopingcarts).toBe('Shopping cart')
 console.log(shopingcarts)


 //print facebook text
 let facebook=await page.locator(`//div[@class="column follow-us"]//li[position()=1]`).textContent()

 //check matching element
 expect(facebook).toBe('Facebook')
 console.log("facebook text: ",facebook)
 







})