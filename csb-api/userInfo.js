
let env='stage1-api.dragonbet.co.uk'
function userInfoAPI(){
    return cy.get('@token').then(token => {
        return cy.request(
        {
            method : 'GET',
            headers: {
                authorization: 'Bearer ' + token
            },
            url : 'https://'+env+'/api/v3/auth/user/user-information'
        }).then((resp)=>{
            expect(resp.status).to.eq(200)
            return resp.body;
        })
    });
}

module.exports = {
    userInfoAPI,
};