const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
import { faker } from '@faker-js/faker';
const utils = require('../support/utils');
let env='stage1-api.dragonbet.co.uk'

async function loginAPI(email, password) {
    const response = await chai.request(`https://${env}`)
        .post('/api/v3/user/login')
        .send({
            email,
            password,
        });
    expect(response).to.have.status(200);
    const { user_id, token } = response.body.data;
    return { user_id, token };
}

async function getBetsAPI(fixture_id){
    const response = await chai.request(`https://${env}`)
        .get(`/api/v3/fixture/${fixture_id}`);
    expect(response).to.have.status(200);
    return response;
}

async function placeBetAPI(amount, freeBets,betData) {
    let user_id = betData.user_id;
    const response = await chai.request(`https://${env}`)
        .post('/api/v3/auth/bet')
        .set('authorization', `Bearer ${betData.token}`)
        .send({
            customer: { user_id },
            bets: [
                {
                    currency: 'GBP',
                    allow_odd_changes: false,
                    channel: 'WEB',
                    is_fixed_odds: true,
                    bet_type: 'SINGLE',
                    stake_per_line: amount,
                    use_free_money: freeBets,
                    selections: [
                        {
                            selection_type: 'WIN',
                            parts: [
                                {
                                    fixture_id: betData.fixture_id,
                                    side_bet_id: betData.side_bet_id,
                                    winner_id: betData.winner_id,
                                    type: 'WIN',
                                    starting_price: false,
                                    best_odds_guaranteed: false,
                                    order: 1,
                                    odds: betData.odds
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    cy.log(JSON.stringify(response));
    expect(response).to.have.status(202);
    return response.body;
}

async function createUserAPI(timestamp) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let day = utils.randomNumber(1, 30);
    let month = utils.randomNumber(1, 12);
    let year = utils.randomNumber(1930, 1995);

    let phoneNumber = "+44123" + Math.floor(Math.random() * 10000000);
    cy.wrap(firstName).as("firstName");
    cy.wrap(lastName).as("lastName");
    day = day.toString();
    month = month.toString();
    day = day.length > 2 ? day : day.padStart(2, "0");
    month = month.length > 2 ? month : month.padStart(2, "0");
    let dob = month + "/" + day + "/" + year;
    cy.wrap(dob).as("dob");
    const response = await chai
        .request(`https://${env}`)
        .post("/api/v3/user/register")
        .send({
            email: `johnny.zamora+qa${timestamp}@fansunite.com`,
            username: firstName + lastName,
            phone_number: phoneNumber,
            phone_number_country_code: "GB",
            password: "Password1234#",
            password_confirmation: "Password1234#",
            date_of_birth: {
                dob_day: day,
                dob_month: month,
                dob_year: year,
            },
            first_name: firstName,
            last_name: lastName,
            promotions_consent: true,
            affiliate_code: "",
            street_name: "43 King Street",
            city: "London",
            country: "GB",
            post_code: "WC2E 8JY",
            currency: "GBP",
            agreedTnC: true,
            signup_code: "",
        })
    return response.body;
}

async function userInfoAPI(token) {
    const response = await chai.request(`https://${env}`)
        .get('/api/v3/auth/user/user-information')
        .set('authorization', `Bearer ${token}`)
    return response.body;
}


module.exports = {
    loginAPI,getBetsAPI,placeBetAPI,createUserAPI,userInfoAPI
};