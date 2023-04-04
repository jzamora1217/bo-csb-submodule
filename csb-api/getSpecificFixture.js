function getBetSelectionsAPIData(fixture_id) {
    cy.api({
        method: 'GET',
        url: 'https://stage1-api.dragonbet.co.uk/api/v3/fixture/'+fixture_id,
    }).then((response) => {
        expect(response.status).to.eq(200);
        fixture_id = response.body.data.id;
        side_bet_id = response.body.data.side_bets[1].id;
        winner_id = response.body.data.side_bets[1].options[0].id;
        odds = response.body.data.side_bets[1].options[0].fixed_odds;
    });
}

module.exports = {
    getBetSelectionsAPIData,
};