const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

let env='stage2-api.dragonbet.co.uk'

async function loginAPI(email, password) {
    const response = await chai.request(`https://${env}`)
        .post('/api/v3/user/login')
        .send({
            email,
            password,
        });
    expect(response).to.have.status(200);
    const { user_id, token } = response.body.data;
    cy.wrap(token).as('token');
    cy.wrap(user_id).as('user_id');
}

async function getBetsAPI(fixture_id){
    const response = await chai.request(`https://${env}`)
        .get(`/api/v3/fixture/${fixture_id}`);
    return response;
}

module.exports = {
    getBetsAPI,loginAPI
};