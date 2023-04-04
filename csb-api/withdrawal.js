function makeWithdrawalAPI(withdrawableAmount, paymentMethod) {
    userWithdrawableAmount = withdrawableAmount;
    //1. select Dragonbet WL
    csbe2e.selectWL('dragonbet');
    let stageNumber = 'stage1';
    let env = stageNumber + '-api.dragonbet.co.uk';
    userAccountInfo = csbe2e.selectWL('dragonbet');
    //2. Log in to Dragonbet WL via API
    csbe2e.loginAPI(userAccountInfo.email, userAccountInfo.password);
    //3. Make a withdrawal on Dragonbet WL via API
    cy.get('@user_id').then(user_id => {
        cy.get('@token').then(token => {
            cy.request({
                method: 'POST',
                url: 'https://' + env + '/api/v3/auth/wallet/withdraw',
                headers: {
                    authorization: 'Bearer ' + token
                },
                body: {
                    "type": paymentMethod,
                    "amount": withdrawableAmount,
                    "token": "08a43bed-87c0-4438-b0eb-e7fa79957c06",
                    "currency": userAccountInfo.currency
                }
            }).then(res => {
                expect(res.status).to.eq(200);
                expect(res.body.data.success).to.eq(true);
                let totalBalanceLeft = res.body.wallet.total;
                cy.wrap(totalBalanceLeft).as('totalBalanceLeftAPI');
                let realMoneyLeft = res.body.wallet.real_amount;
                cy.wrap(realMoneyLeft).as('realMoneyLeftAPI');
            })
        })
    })
}

module.exports = {
    makeWithdrawalAPI,
};