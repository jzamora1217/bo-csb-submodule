let env='stage2-api.dragonbet.co.uk'

function placeBetAPI(amount,freeBets){

    let fixture_id_post;
    let side_bet_id_post;
    let winner_id_post;
    let odds_post;
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

    return cy.get('@user_id').then(user_id => {
        return cy.get('@token').then(token => {
            return cy.request(
                {
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
                                "currency": "GBP",
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
                }).then((resp) => {
                expect(resp.status).to.eq(202)
                return resp.body
            })
        })
    });
}

module.exports = {
    placeBetAPI,
};