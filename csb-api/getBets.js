let env='stage1-api.dragonbet.co.uk'

function getBetsAPI(fixture_id){
    return cy.request({
        method : 'GET',
        url : `https://${env}/api/v3/fixture/${fixture_id}`
    }).then((resp)=>{
        expect(resp.status).to.eq(200)
        return resp.body;
    })
}

module.exports = {
    getBetsAPI,
};