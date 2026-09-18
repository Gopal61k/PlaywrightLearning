import{test,expect} from '@playwright/test'

test('handle iframe',async({page})=>{
await page.goto('https://ui.vision/demo/webtest/frames/')

//approch 1: navigate to frame using page.frame() method
const frame1=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1'})
//const frame1=page.locator('//frame[@src="frame_1.html"]')

if(frame1)
{
    await frame1.locator('//input[@name="mytext1"]').fill("hello")
}
else{
    console.log("Frame not available")
}

//verify number of length of frame
const frames=page.frames()

console.log("number of frames:",frames.length)

//assertion
  expect(frames.length).toBe(7)



  //approach 2: using framelocator() method handle frame
  //locate frame
  const movetoFrame1=page.frameLocator('//frame[@src="frame_1.html"]');
  //find element on frma
  const inputText=movetoFrame1.locator('//input[@name="mytext1"]')
  //enter value in frame text field
  await inputText.fill("John")


})

test('2.handling inner frame frame3-->iframe',async({page})=>{
await page.goto('https://ui.vision/demo/webtest/frames/')
    //parent frame
 
  // Parent frame
    const frame3=page.frameLocator("frame[src='frame_3.html']")
    await page.locator("input[name='mytext3']").fill("Welcome")
//child frame locator
const childframe=frame3.locator("iframe ")

//perform operation on child frame
//await childframe.getByRole('radio',{name:'Hi, I am the UI.Vision IDE'}).check()
await childframe.getByRole('radio',{name:'I am a human'}).check()



})