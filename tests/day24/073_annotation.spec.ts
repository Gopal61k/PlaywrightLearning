import{test,expect} from '@playwright/test'

//test.describe() - Grouping of tests
test.describe('Group1',async()=>
{
    //test.skip() - Skip using test.describe() annotation
    test.skip("login test",async()=>{
        console.log("This is login test")
    })
    //fail using test.describe() annotation-forcefully failed
    test.fail("Home page title check",async()=>{
        console.log("This is home page title check")
    })
//test.fixme() - Test is not ready
    test.fixme("Cart test",async()=>{
        console.log("This is cart test")
    })
    test("@sanity @regression Payment test",async()=>{
        test.slow()  //make test wait for 90 secs
        console.log("This is payment test")
    })




})