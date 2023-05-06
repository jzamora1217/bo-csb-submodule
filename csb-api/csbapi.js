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
    expect(response).to.have.status(202);
    return response.body;
}

module.exports = {
    loginAPI,getBetsAPI,placeBetAPI,
};