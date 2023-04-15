let env='stage1-backoffice-api.askottentertainment.com'

function settleMarket(side_bet_id,winner_id){
    return cy.get('@BOToken').then(BOToken => {
        return cy.request({
            method : 'POST',
            url: 'https://'+env+'/api/v1/market-settlement?site_id=4,3,7,8,9,10,11,14,15,16,98,99,17,18,19',
            headers: {
                authorization: 'Bearer ' + BOToken
            },
            body: {
                "action": "settle",
                "side_bets": [
                    {
                        "side_bet_id": side_bet_id,
                        "winner_id": winner_id
                    }
                ]
            }
        }).then((resp)=>{
            expect(resp.status).to.eq(200)
            return resp.body
        })
    })
}

module.exports = {
    settleMarket,
};