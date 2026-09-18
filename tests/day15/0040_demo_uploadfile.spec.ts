import{test,expect} from '@playwright/test'

test.describe(async()=>{
test.beforeEach('launch URL before each test',async({page})=>
{
    await page.goto('https://sdetqa.vercel.app/autoplay')


} )
test.afterEach(async({page})=>{
    await page.close();
})
test('upload file',async({page})=>{

    //locator
    const singleFileInput=page.locator('#singleFileInput')
    const singleFileInputButton=page.getByRole('button',{name:'Upload Single File'})
    const uploadfileStatus=page.locator('#singleFileStatus')

    //upload files
    singleFileInput.setInputFiles('uploads/RESUME.pdf')
    await page.waitForTimeout(2000)
    await singleFileInputButton.click()
    //validate uploaded file
    await expect(uploadfileStatus).toHaveText(/Single file selected: RESUME.pd/)
})


test('multiple upload file',async({page})=>
{
    const multipleFileupload=page.locator('#multipleFilesInput')
    const multiuploadButton=page.getByRole('button', { name: 'Upload Multiple Files' });
    const multiuploadstatus=page.locator('#multipleFilesStatus')
 await page.waitForLoadState('load') // waiting for loading page
    //upload multiple file
    multipleFileupload.setInputFiles(["uploads\Gopal_Karhale_CV.pdf","uploads\RESUME.pdf"])
   await page.waitForTimeout(5000)
    await multiuploadButton.click()

    //validate uploaded file name
    await expect(multiuploadstatus).toContainText(/Gopal_Karhale_Resume.pdf/)
    await expect(multiuploadstatus).toContainText(/Gopal_Karhale_CV.pdf/)
await page.waitForTimeout(5000)
}) 

})
