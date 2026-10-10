import { expect, test } from '@playwright/test';
import fs from 'fs';
 
//create global URL
const BASE_URL = 'https://restful-booker.herokuapp.com';

test('create post request body json', async ({ request }) => {
    //Path of json forlder
  const jsonPath = 'tests/day31/testData/post_request_body.json'
  //get responsePayload 
  const responsePayload = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
//create post request
  const response = await request.post(`${BASE_URL}/booking`, { data: responsePayload });
const responseBody = await response.json();
  //print responseBpdy
  console.log(responseBody)
  //validate status code
  expect(response.status()).toBe(200);
expect(response.statusText()).toBe('OK') 

//validating responseBody
expect(responseBody).toHaveProperty('bookingid');
expect(responseBody).toHaveProperty('booking');

// validate booking id ==> integer
expect(responseBody.bookingid).toEqual(expect.any(Number));

// validate booking field data
const booking = responseBody.booking;
 expect(booking).toMatchObject({
  firstname: responsePayload.firstname,
  lastname: responsePayload.lastname,
  totalprice: responsePayload.totalprice,
  depositpaid: responsePayload.depositpaid,
  additionalneeds: responsePayload.additionalneeds,
});

//validate booking date
expect(booking.bookingdates).toMatchObject({
    checkin:responsePayload.bookingdates.checkin,
    checkout:responsePayload.bookingdates.checkout
})



});