import{test,expect} from '@playwright/test'

test.describe("validate dropdown",()=>{

    const pageURL="https://bstackdemo.com/"

 test("perform operation on dropdown",async({page})=>{
 await page.goto(pageURL);
 expect(page.getByText('Products',{exact:true}))

 })

 test('select lowest to highest should be sorted',async({page})=>{

    const sortedselects= page.locator('Lowest to highest')
   // await sortedselects.allTextContents()
   // console.log(sortedselects)
    
 sortedselects.selectOption({label:'Lowest to highest'})
 await expect(sortedselects).toHaveValue('Lowest to highest')

})

})