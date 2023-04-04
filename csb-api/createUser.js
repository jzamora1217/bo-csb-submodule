import { faker } from '@faker-js/faker';
const utils = require('../support/utils');
let user_id;

function createUserAPI(timestamp){
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let day = utils.randomNumber(1, 30);
    let month = utils.randomNumber(1, 12);
    let year = utils.randomNumber(1930, 1995);

    let phoneNumber = "+44123" + Math.floor(Math.random() * 10000000)
    cy.wrap(firstName).as('firstName')
    cy.wrap(lastName).as('lastName')
    cy.request({
        method: 'POST',
        url: 'https://' + env + '/api/v3/user/register',
        body: {
            "email": `johnny.zamora+${timestamp}@fansunite.com`,
            "username": firstName+lastName,
            "phone_number": phoneNumber,
            "phone_number_country_code": "GB",
            "password": "Password1234#",
            "password_confirmation": "Password1234#",
            "date_of_birth": {
                "dob_day": day,
                "dob_month": month,
                "dob_year": year
            },
            "first_name": firstName,
            "last_name": lastName,
            "promotions_consent": true,
            "affiliate_code": "",
            "street_name": "43 King Street",
            "city": "London",
            "country": "GB",
            "post_code": "WC2E 8JY",
            'currency': userAccountInfo.currency,
            "agreedTnC": true,
            "signup_code": ""
        },
    }).then((res) => {
        expect(res.status).to.eq(200);
        user_id = res.body.data.user_id;
    });
    day = day.toString();
    month = month.toString();
    day = day.length > 2 ? day : day.padStart(2, "0");
    month = month.length > 2 ? month : month.padStart(2, "0");
    let dob = month+'/'+day+'/'+year;
    cy.wrap(dob).as('dob')
}


module.exports = {
    createUserAPI,

};