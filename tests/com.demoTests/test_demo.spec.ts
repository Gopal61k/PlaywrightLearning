import{test,expect} from '@playwright/test'
import { LoginPage} from '../../pages/LoginPage';
import { signUpPage } from '../../pages/signUpPage';
import { HomePage  } from '../../pages/HomePage';

 
test.describe.configure({mode:'serial'});

test.describe('Demoblaze tests',()=>{

    //comman functionality
    const baseUrl='https://www.demoblaze.com/index.html';
    const testProduct='Nexus 6';
    const testPassword='test@1234'

    let signedUpUser:{username:string,password:string}| undefined;


    //launch Url before each test ==> 
    test.beforeEach(async({page})=>{
        await page.goto(baseUrl)
    })

    //closer browser after each test==> close browseer
    test.afterEach(async({page})=>{
        await page.close()
    })

    //user sign Up account

    test('User can sign up with a new account',async({page})=>{
   const signuppage=new signUpPage(page);

 signedUpUser={
    username:`Gopal_${Date.now()}`,
    password:testPassword
 }
 const alertMessage=await signuppage.signUp(signedUpUser.username,signedUpUser.password)
  expect(alertMessage).toContain('Sign up successful.')


    })

    
//Test case 2: login user

test("user can login,add product to cart and validate it",async({page})=>{

//object of page
const loginpage=new LoginPage(page)
const homepage=new HomePage(page)

//login page
await loginpage.navigateTOLogin() 
//await loginpage.login(signedUpUser!.username,signedUpUser!.password)
await loginpage.login('Gopal_1697040910340',testPassword)

//home page-> add product
await page.waitForTimeout(1000)
await homepage.addProductToCart(testProduct)

//await page.waitForTimeout(2000)
await homepage.navigateToCart()
});

})