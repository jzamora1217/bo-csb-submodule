let user_id,token;
let env='stage1-api.dragonbet.co.uk'

function loginAPI(email, password){
    cy.request({
        method : 'POST',
        url : 'https://'+env+'/api/v3/user/login',
        body: {
            "email": email,
            "password": password,
        }
    }).then((res)=>{
        expect(res.status).to.eq(200)
        user_id = res.body.data.user_id;
        token = res.body.data.token;
        cy.wrap(token).as('token')
        cy.wrap(user_id).as('user_id')
    })
}

module.exports = {
    loginAPI,
};