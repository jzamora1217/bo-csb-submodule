let env='stage1-api.dragonbet.co.uk'
function getBetsAPI(fixture_id){
    let url = `https://${env}/api/v3/fixture/${fixture_id}`
    console.log('*** '+ url)
    cy.request({
        method : 'GET',
        url : `https://${env}/api/v3/fixture/${fixture_id}`
    }).then((res)=>{
        expect(res.status).to.eq(200)
        let fixture_id_api = res.body.data.id;
        // side_bet_id_api = res.body.data.side_bets[2].id;
        // winner_id_api = res.body.data.side_bets[2].options[0].id;
        // odds_api = res.body.data.side_bets[2].options[0].fixed_odds;
        cy.wrap(fixture_id_api).as('fixture_id_api');
        // cy.wrap(side_bet_id_api).as('side_bet_id_api');
        // cy.wrap(winner_id_api).as('winner_id_api');
        // cy.wrap(odds_api).as('odds_api');
    })
}

module.exports = {
    getBetsAPI,
};