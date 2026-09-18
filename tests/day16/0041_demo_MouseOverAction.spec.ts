import{test,expect} from '@playwright/test'

test.beforeEach('Navigate to Toggle button section for Mouse over action',async({page})=>{
 await page.goto('https://sdetqa.vercel.app/autoplay')
 await expect(page).toHaveURL(/autoplay/)

})
test.afterEach(async({page})=>
{
     await page.close()
})
test('1.toggle button text changes',async({page})=>
{
    //locator
    const toggleButton=page.locator('#toggleBtn')
    const originalToggleText=toggleButton.textContent()
   console.log("before clicking button text: ",await originalToggleText)

    //click on toggle button
    await page.waitForTimeout(1000)
   await toggleButton.click()

    //validate after click button text
    const ToggleText=toggleButton.textContent()
    console.log("after click toggle text :", await ToggleText)

    //assertion 
     expect(ToggleText).not.toBe(originalToggleText)
})

test('2.Right click /context click',async({page})=>{
 const rightClickButton=page.locator('button',{hasText:' Right Click Me'})
 await rightClickButton.click({button:'right'}) //right left middle click on button

 //capture option and verify if needed

 const options=page.locator('#customContextMenu button').allInnerTexts()
 console.log("get all option :",await options) //[ 'Edit', 'Cut', 'Copy', 'Paste', 'Delete', 'Quit' ]

 //check visibility of 'quit' option
 const quitText=page.locator("button",{hasText:'Quit'})
 await expect(quitText).toBeVisible()

 //get text from popup

 page.on('dialog',(dialog)=>{
    //validate sms on alet popup
     expect(dialog.message()).toEqual('Selected: Quit')
     console.log(dialog.message()) //Selected: Quit
     dialog.accept() //click on 'Ok'/accept
    // dialog.dismiss(); //click on dismiss value
    dialog.defaultValue()
    dialog.type()

 })
 //click on quit button
 await quitText.click()

})

test('3.Mouser over action ',async({page})=>{
const hoverButton=page.locator("//span[text()='Hover me']")
// mouse hover on button--> title visible
await expect(hoverButton).toBeVisible()
await hoverButton.hover()
console.log('title of hover button: ',await hoverButton.getAttribute('title'))
//validate title of hover text
expect(await hoverButton.getAttribute('title')).toBe('This is a tooltip')

})

test('4.validate double click actin',async({page})=>{
    //locator
 const dblClickLocator=page.getByRole('button',{name:'Double Click'});
 //click oon dblclick button

 //validate popup 
 page.on('dialog',dialog=>{
    expect(dialog.message()).toContain('Double clicked!')
    dialog.accept()
    console.log(dialog.message())
 })
 await dblClickLocator.click()

})

test('5.verify drag and drop mouse over action',async({page})=>{

    const sourceTeam=page.getByText('Drag me',{exact:true})
    const destinationTeam=page.getByText('Drop zone',{exact:true})
page.on('dialog',dialog=>{
    expect(dialog.message()).toContain('Dropped!')
})
    await sourceTeam.dragTo(destinationTeam);


})



