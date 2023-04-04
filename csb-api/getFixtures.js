function getFixtures(){

    cy.request({
        method : 'GET',
        url : 'https://'+env+'/api/v3/fixture/104221229743155067'
    }).then((res)=>{
        expect(res.status).to.eq(200)
        fixture_id_api = res.body.data.id;
        side_bet_id_api = res.body.data.side_bets[2].id;
        winner_id_api = res.body.data.side_bets[2].options[0].id;
        odds_api = res.body.data.side_bets[2].options[0].fixed_odds;
        cy.wrap(fixture_id_api).as('fixture_id_api');
        cy.wrap(side_bet_id_api).as('side_bet_id_api');
        cy.wrap(winner_id_api).as('winner_id_api');
        cy.wrap(odds_api).as('odds_api');
    })
}

module.exports = {
    getFixtures,
};