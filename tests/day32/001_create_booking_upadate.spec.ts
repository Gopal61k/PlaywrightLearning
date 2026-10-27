import{test,expect} from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

// Utility function to read JSON data from file
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

//create test for post,get and update data

test("update booking-create,get and booking record",async({request})=>
{
    //step 1:create new booking using post request
    //ger data from json file
 const createBookingData=readJson(path.join(__dirname, '..', 'day31', 'testData', 'post_request_body.json'))
 const createResponse=await request.post(`/booking`,{data:createBookingData})
 
 //validate status code and response
 expect(createResponse.status()).toBe(200)
 expect(createResponse.statusText()).toBe("OK")


const createdBooking = await createResponse.json()
const bookingId = createdBooking.bookingid  // extracting bookingID from json response body


 //step 2: get the created booking using get request
 const getResponse=await request.get(`/booking/${bookingId}`)
 
 //validate status code /response
 expect(getResponse.status()).toBe(200)
 expect(getResponse.statusText()).toBe("OK")

 //print json bodyy response
 const getBookingDetails=await getResponse.json()

 console.log("Booking details before update:",getBookingDetails)
    
 //step 3: create token-this is request for patch,put and delete request
//get token data from json file

//const tokenData=readJson("./day31/testData/token._request_body.json")
 const tokenData=readJson(path.join(__dirname, '..', 'day31', 'testData', 'token._request_body.json'))

const tokenResponse=await request.post(`/auth`,{data:tokenData})

//validate status code
expect(tokenResponse.status()).toBe(200)
expect(tokenResponse.statusText()).toBe("OK")

const tokenJson=await tokenResponse.json()
const token=tokenJson.token
console.log("Token-generated:",token)



//step 4:partial update the booking using Patch Request with token in headers
const partial_updateData=readJson(path.join(process.cwd(), 'tests', 'day31', 'testData', 'patch_request_body.json'))
const partial_updateresponse=await request.patch(`/booking/${bookingId}`,{
    headers:
    {
        "Content-Type":"application/json",
        "Cookie":`token=${token}`
    },
    data:partial_updateData,
})

//validate status code/response

expect(partial_updateresponse.status()).toBe(200)
expect(partial_updateresponse.statusText()).toBe("OK")

//print partial updated JSON file

const partial_updateBooking=await partial_updateresponse.json()
console.log("After Partial update response:",partial_updateBooking)
//step 5:Full update the booking using PUT request
const full_updateData=readJson(path.join(__dirname, '..', 'day31', 'testData', 'put_request_body.json'))
const full_updareResponse=await request.put(`/booking/${bookingId}`,
    {
        headers:
        { 
            "content-type":"application/json",
            "Cookie":`token=${token}`
        },
        data:full_updateData
    })

    //validate status code and response
    expect(full_updareResponse.status()).toBe(200)
    expect(full_updareResponse.statusText()).toBe("OK")

    //print full updated responseBody
    const full_update_responseBody=full_updareResponse.json()
    console.log("Full update: ",await full_update_responseBody)

    
    //6.Delete booking
    const deleteResponse=await request.delete(`/booking/${bookingId}`,
        {
            headers:{
                "Content-Type":"application/json",
                "Cookie":`token=${token}`
            }
        })

        //validate status and response
        expect(deleteResponse.status()).toBe(201)
        expect(deleteResponse.statusText()).toBe("Created")

        console.log("Booking Details are Deleted....")
})
