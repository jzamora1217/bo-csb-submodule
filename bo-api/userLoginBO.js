let env='stage1-backoffice-api.askottentertainment.com'

function loginAPIBO(email, password){
    cy.request({
        method : 'POST',
        url: 'https://'+env+'/api/v1/auth/get-token/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        form: true,
        body: {
            'username': email,
            'password': password
        }
    }).then((res)=>{
        expect(res.status).to.eq(200)
        cy.wrap(res.body.data.token).as('BOToken')
    })
}

module.exports = {
    loginAPIBO,
};