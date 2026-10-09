import{test,expect} from '@playwright/test'

//GLobal URL
const BASE_URL="https://restful-booker.herokuapp.com";

test("create booking with test data",async({request})=>
{
const requestPayload=
{
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 1000,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-08-01",
      checkout: "2026-08-05", 
    },
    additionalneeds: "Breakfast"
  };

//send the post request
const response=await request.post(`${BASE_URL}/booking`,{data:requestPayload})

//store body in json format
const responseBody=await response.json()

//print response body in json format

console.log(responseBody)

//validate status code /response
expect(response.status()).toBe(200)
expect(response.statusText()).toBe("OK")

//validating response body
expect(responseBody).toHaveProperty("bookingid")
expect(responseBody.bookingid).toEqual(expect.any(Number))
expect(responseBody.booking).toHaveProperty('firstname')


//validating body fields

const booking=await responseBody.booking

expect(booking).toMatchObject({
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 1000,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-08-01",
      checkout: "2026-08-05", 
    },
    additionalneeds: "Breakfast"
  })

  //validate bookingdates

  expect(booking.bookingdates).toMatchObject({
    checkin: "2026-08-01",
      checkout: "2026-08-05", 
    })

    //validate totalpricce
    expect(booking).toMatchObject({
        totalprice:1000
    })
















})

