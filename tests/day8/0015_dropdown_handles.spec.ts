import{test,expect} from '@playwright/test'

test.describe("handle dropdown",()=>{

    const pageURL='https://sdetqa.vercel.app/autoplay.html'
 test.beforeEach(async({page})=>{
    await page.goto(pageURL)
    await expect(page.getByText('AutoPlay')).toBeVisible()
 })

 test("1.single select dropdown should be single country",async({page})=>{

    //locator dropdown
    const countryDropdown=page.locator('#country')
 
    await expect(countryDropdown).toBeVisible()


    //validate default value -India
    await expect(countryDropdown).toHaveValue('india')

    //3 way to get value label/attribute value and index :using selectOption() method

    //1 select by label
    countryDropdown.selectOption({label:'UK'})
    await expect(countryDropdown).toHaveValue('uk')

    //2 select by attribute value
    countryDropdown.selectOption({value:'germany'})
    await expect(countryDropdown).toHaveValue('germany')

    //3. selct by index :index start from 0
    countryDropdown.selectOption({index:3})
    await expect(countryDropdown).toHaveValue('germany')
 

// // Select by a combination of value and label
//     await countrySelect.selectOption({ value: 'france', label: 'France' });
//     await expect(countrySelect).toHaveValue('france');

/// Validate dropdown option count
    const options = countryDropdown.locator('option');
    await expect(options).toHaveCount(5);

    // Validate option text list contains Germany
    const optionTexts = await options.allTextContents();
    expect(optionTexts).toContain('Germany');


 //print all option

 for(const option of await optionTexts)
 {
 console.log(option)
 }
 })

 test("2.multi select dropdown should select multiple colors",async({page})=>{

const colorsSelect=page.locator('#colors')
await expect(colorsSelect).toBeVisible()

//velidate selected colour : blue
await expect(colorsSelect).toHaveValue("blue")

//select colours: red,blue
  // Select multiple options by labels
    await colorsSelect.selectOption([{ label: 'Red' }, { label: 'Green' }, { label: 'Yellow' }]);
await expect(colorsSelect).toHaveValues(['red', 'green', 'yellow']);

//select multiple options by value
await colorsSelect.selectOption([{value:'red'},{value:'blue'},{value:'yellow'}])
await expect(colorsSelect).toHaveValues(['red','blue','yellow'])

//select multiple options by index
await colorsSelect.selectOption([{index:1},{index:3}])
await expect(colorsSelect).toHaveValues(['blue','yellow'])
 
//print all multiple options
const options=colorsSelect.locator('option')
const optionText=await options.allTextContents()

 console.log(optionText) //[ 'Red', 'Blue', 'Green', 'Yellow' ]

 })


  test('select fruites dropdown value',async({page})=>{
    //locate dropdown value
 const fruiteselct=page.locator('#sorted option')
 //find all value
 const fruitetexts=await fruiteselct.allTextContents()
 //store in []
 for(const fruite of await fruitetexts)
 {
  console.log(fruite)  //Apple Banana Mango Orange
 }

 //original list
const originalList=fruitetexts;

//sort listing
const sortedList=[...fruitetexts].sort()

console.log("original list:",originalList)
console.log("sorted list:",sortedList)

expect(originalList).toEqual(sortedList);


  })




})

