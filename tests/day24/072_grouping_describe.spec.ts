import { test, expect } from '@playwright/test'

test.describe('Group1', async () => {
    test('Test1', async () => {
        console.log("This is Test 1.....")

    })
    test('Test 2', async () => {
        console.log('This is Test 2.....')
    })

})

test.describe("Group 2", async () => {
    test.fail("Test3", async () => {
        console.log('This is Test 3....')
    })
    test.skip('Test 4', async () => {
        console.log("This is Test 4");
    })
    test('Test 5', async () => {
        console.log("This is Test 5");
    })
})




///Nested Group //Nested describe block -multiple describ block in side each other
test.describe('E-com plstform', () => {
    //Describe block 1
    test.describe('Login to app', () => {
        //Test 1
        test('Login with valid credentiala', async () => {
            console.log("Login Test can pass")
        })

        //Test 2
        test('Home page title check', async () => {
            console.log("Home page title check can pass")
        })

    })

    //describe block 2
    test.describe('Cart', () => {
        //Test 1
        test('Add item to cart', () => {
            console.log("add item to cart test can pass")
        })

        //Test 2
        test('Remove add item from cart', () => {
            console.log('Remove item from cart test can pass')
        })
    })


})


//serial describe block - run tests in serial manner
test.describe.serial('Execute tests in seriel manner', async () => {
    test('Login test', async () => {
        console.log("Before test2 can pass")
    })
    test('Tear down test', async () => {
        console.log("After test 1 can pass")
    })

})