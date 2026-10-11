import { it } from '@faker-js/faker'
import{test,expect, request} from '@playwright/test'

test("get booking details",async({request})=>{

    const boookingid=1
    const getAPIResponse=await request.get(`booking/${boookingid}`)
    const getAPIResponseBody=await getAPIResponse.json()

    console.log(getAPIResponseBody)

    //validate status code and text
    expect(getAPIResponse.status()).toBe(200)
    expect(getAPIResponse.statusText()).toBe("OK")

    //optionally validate expected fields if known
    expect(getAPIResponseBody).toHaveProperty('firstname')
    expect(getAPIResponseBody).toHaveProperty("lastname")
})

//get() with Quary params

test("Get Booking datais by name- Quary params",async({request})=>{

    const firstname="Jim"
    const lastname="Brown"
    const response=await request.get(`/booking`,
    {
        params:
        {
            firstname,
            lastname
        }
    })

 const responseBody=await response.json()
 console.log(responseBody)


 //validate status code/response
 expect(response.status()).toBe(200)
 expect(response.statusText()).toBe("OK")

 //verify booking id should be a number and should be greater than 0

 for(const item of responseBody)
 {
    expect(item).toHaveProperty("bookingid")
    expect(typeof item.bookingid).toBe("number")
    expect(item.bookingid).toBeGreaterThan(0)

 }


})