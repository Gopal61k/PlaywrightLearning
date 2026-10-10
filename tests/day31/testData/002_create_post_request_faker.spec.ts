import{test,expect} from '@playwright/test'
import {de, faker} from '@faker-js/faker'
import {DateTime} from 'luxon'

const BASE_URL="https://restful-booker.herokuapp.com"

test("create radom request with faker library",async({request})=>
{
    //create randome data using faker library
    const firstname=faker.person.firstName();
    const lastname=faker.person.lastName();
    const totalprice=faker.number.int({min:100,max:1000})
    const depositpaid=faker.datatype.boolean()
//generate date and time using luxon library
const checkinDate=DateTime.now().toFormat("yyyy-mm-dd")
const checkoutDate=DateTime.now().plus({day:5}).toFormat("yyyy-mm-dd")
//hard coded data
const addditionalneeds='super bowls'



//create payload using faker 
const responsePayload={
    firstname:firstname,
    lastname:lastname,
    totalprice:totalprice,
    depositpaid:depositpaid,
    bookingdates:
    {
        checkin:checkinDate,
        checkout:checkoutDate
    },
    addditionalneeds:"super bowls"
}


//create request using post method

const response=await request.post(`${BASE_URL}/booking`,{data:responsePayload})

 console.log(await response.json())

})

//get() method

test('Get Booking Details by name-quary params',async({request})=>{
    const firstname='Jim'
    const lastname='Brown'

    const response=await request.get(`${BASE_URL}/booking`,
    {
        params:
        {
            firstname,
            lastname
        }
    })

    const respnseBody=await response.json()
    console.log(respnseBody)
    console.log(response)

    for(const item of respnseBody)




})

