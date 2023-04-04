function placeComboBetAPI(customer_stake) {
    cy.get('@user_id').then((user_id) => {
        cy.get('@accessToken').then((accessToken) => {
            cy.api({
                method: 'POST',
                url: 'https://stage1-api.dragonbet.co.uk/api/v3/auth/bet',
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
                body: {
                    customer: {
                        user_id: user_id,
                    },
                    bets: [
                        {
                            currency: 'GBP',
                            allow_odd_changes: false,
                            channel: 'WEB',
                            is_fixed_odds: true,
                            bet_type: 'DOUBLE',
                            stake_per_line: customer_stake,
                            use_free_money: false,
                            selections: [
                                {
                                    selection_type: 'WIN',
                                    parts: [
                                        {
                                            fixture_id: fixture_id1,
                                            side_bet_id: side_bet_id1,
                                            winner_id: winner_id1,
                                            type: 'WIN',
                                            starting_price: false,
                                            best_odds_guaranteed: false,
                                            order: 1,
                                            odds: odds1,
                                        },
                                    ],
                                },
                                {
                                    selection_type: 'WIN',
                                    parts: [
                                        {
                                            fixture_id: fixture_id2,
                                            side_bet_id: side_bet_id2,
                                            winner_id: winner_id2,
                                            type: 'WIN',
                                            starting_price: false,
                                            best_odds_guaranteed: false,
                                            order: 1,
                                            odds: odds2,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            }).then((response) => {
                partialComboBetAPIData = [];
                oddsAPI = [];
                market_typeAPI = [];
                selectionAPI = [];
                let betStatus1 = response.body.data[0].selections[0].parts[0].status;
                let betStatus2 = response.body.data[0].selections[1].parts[0].status;
                let resFixture_id1 = response.body.data[0].selections[0].parts[0].fixture_id;
                let resFixture_id2 = response.body.data[0].selections[1].parts[0].fixture_id;
                let resSide_bet_id1 = response.body.data[0].selections[0].parts[0].side_bet_id;
                let resSide_bet_id2 = response.body.data[0].selections[1].parts[0].side_bet_id;
                let resWinner_id1 = response.body.data[0].selections[0].parts[0].winner_id;
                let resWinner_id2 = response.body.data[0].selections[1].parts[0].winner_id;
                expect(response.status).to.eq(202);
                expect(betStatus1).to.eq('ACCEPTED');
                expect(betStatus2).to.eq('ACCEPTED');
                expect(resFixture_id1).to.eq(fixture_id1);
                expect(resFixture_id2).to.eq(fixture_id2);
                expect(resSide_bet_id1).to.eq(side_bet_id1);
                expect(resSide_bet_id2).to.eq(side_bet_id2);
                expect(resWinner_id1).to.eq(winner_id1);
                expect(resWinner_id2).to.eq(winner_id2);
                //retrieve placed Combo- Double bet API data
                cy.wrap(response.body.data[0].bet_type).as('bet_typeComboAPI');
                cy.wrap(response.body.data[0].id).as('bet_idComboAPI');
                cy.wrap(response.body.data[0].stake_per_line).as('stakeComboAPI');
                cy.wrap(response.body.data[0].potential_payout).as('returnComboAPI');
                cy.wrap(response.body.data[0].selections[0].parts[0].odds_given).as('oddsAPI1');
                cy.wrap(response.body.data[0].selections[1].parts[0].odds_given).as('oddsAPI2');
                cy.wrap(response.body.data[0].selections[0].parts[0].option).as('selectionAPI1');
                cy.wrap(response.body.data[0].selections[1].parts[0].option).as('selectionAPI2');
                cy.wrap(response.body.data[0].selections[0].parts[0].market_type).as('market_typeAPI1');
                cy.wrap(response.body.data[0].selections[1].parts[0].market_type).as('market_typeAPI2');
                cy.wrap(response.body.data[0].selections[0].parts[0].title).as('eventAPI1');
                cy.wrap(response.body.data[0].selections[1].parts[0].title).as('eventAPI2');
                cy.wrap(response.body.data[0].selections[0].parts[0].competition).as('competitionAPI1');
                cy.wrap(response.body.data[0].selections[1].parts[0].competition).as('competitionAPI2');
                partialComboBetAPIData[0] = response.body.data[0].id;
                partialComboBetAPIData[1] = response.body.data[0].selections[0].parts[0].title;
                partialComboBetAPIData[2] = response.body.data[0].selections[0].parts[0].competition;
                partialComboBetAPIData[5] = response.body.data[0].selections[1].parts[0].title;
                partialComboBetAPIData[6] = response.body.data[0].selections[1].parts[0].competition;
                oddsAPI[0] = response.body.data[0].selections[0].parts[0].odds_given;
                oddsAPI[1] = response.body.data[0].selections[1].parts[0].odds_given;
                market_typeAPI[0] = response.body.data[0].selections[0].parts[0].market_type;
                market_typeAPI[1] = response.body.data[0].selections[1].parts[0].market_type;
                selectionAPI[0] = response.body.data[0].selections[0].parts[0].option;
                selectionAPI[1] = response.body.data[0].selections[1].parts[0].option;
            });
        });
    });
}

module.exports = {
    placeComboBetAPI,
};