const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
let env='stage1-backoffice-api.askottentertainment.com'

async function loginAPIBO(email, password){
    const response = await chai.request(`https://${env}`)
        .post('/api/v1/auth/get-token/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .send({ username: email, password: password });

    expect(response).to.have.status(200);
    return response.body.data.token;
}

async function createMarket(createMarketBody,BOToken){
    console.log('boTken'+BOToken)
    const response = await chai.request(`https://${env}`)
        .post('/api/v1/market-management/create-market?site_id=4,3,7,8,9,10,11,14,15,16,98,99,17,18,19')
        .set('authorization', `Bearer ${BOToken}`)
        .send(createMarketBody)
    console.log('inside '+response.body)
    return response.body;
}

async function settleMarket(side_bet_id,winner_id,BOToken) {
    const response = await chai.request(`https://${env}`)
        .put('/api/v1/market-settlement?site_id=4,3,7,8,9,10,11,14,15,16,98,99,17,18,19')
        .set('authorization', `Bearer ${BOToken}`)
        .send({
            "action": "settle",
            "side_bets": [
                {
                    "side_bet_id": side_bet_id,
                    "winner_id": winner_id
                }
            ]
        })
    console.log(response.body);
    return response.body;
}
module.exports = {
    loginAPIBO,createMarket,settleMarket
};