function placeBetAPI(amount,freeBets,fixture_id,side_bet_id,winner_id,odds){

    let fixture_id_post = fixture_id;
    let side_bet_id_post = side_bet_id;
    let winner_id_post = winner_id;
    let odds_post = odds;
    if(!fixture_id) {
        cy.get('@odds_api').then(odds_api => {
            cy.get('@winner_id_api').then(winner_id_api => {
                cy.get('@side_bet_id_api').then(side_bet_id_api => {
                    cy.get('@fixture_id_api').then(fixture_id_api => {
                        fixture_id_post = fixture_id_api;
                        side_bet_id_post = side_bet_id_api;
                        winner_id_post = winner_id_api;
                        odds_post = odds_api;
                    });
                });
            });
        });
    }
    cy.get('@user_id').then(user_id => {
        cy.get('@token').then(token => {
            cy.request({
                method: 'POST',
                url: 'https://'+env+'/api/v3/auth/bet',
                headers: {
                    authorization: 'Bearer ' + token
                },
                body: {
                    "customer": {
                        "user_id": user_id
                    },
                    "bets": [
                        {
                            "currency": userAccountInfo.currency,
                            "allow_odd_changes": false,
                            "channel": "WEB",
                            "is_fixed_odds": true,
                            "bet_type": "SINGLE",
                            "stake_per_line": amount,
                            "use_free_money": freeBets,
                            "selections": [
                                {
                                    "selection_type": "WIN",
                                    "parts": [
                                        {
                                            "fixture_id": fixture_id_post,
                                            "side_bet_id": side_bet_id_post,
                                            "winner_id": winner_id_post,
                                            "type": "WIN",
                                            "starting_price": false,
                                            "best_odds_guaranteed": false,
                                            "order": 1,
                                            "odds": odds_post
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }).then((res) => {
                expect(res.status).to.eq(202)
                betAPIData[0]= res.body.data[0].id;
                betAPIData[4]= res.body.data[0].bet_type;
                betAPIData[5]= 'Pre-Live';
                betAPIData[6]= 'Fixed Odds';
                betAPIData[7]= res.body.data[0].selections[0].parts[0].game_type;
                betAPIData[8]= res.body.data[0].selections[0].parts[0].competition;
                betAPIData[9]= res.body.data[0].selections[0].parts[0].title;
                betAPIData[10]= res.body.data[0].selections[0].parts[0].market_type;
                betAPIData[11]= res.body.data[0].selections[0].parts[0].option;
                let bet_Id = res.body.data[0].id;
                cy.wrap(bet_Id).as('bet_Id')
                cy.log( "betAPIData: "+ JSON.stringify(betAPIData))
            })
        })
    });
}

module.exports = {
    placeBetAPI,
};