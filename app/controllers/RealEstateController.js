const RealEstateService = require('../../services/RealEstateService');
const RealEstate = new RealEstateService();

module.exports = class RealEstateController {
    constructor() {}

    async index(req, res) {
        let data = '';
        // await RealEstate.settingRequestService();
        // await RealEstate.getListProduct();
        // await RealEstate.gotoLinkChild();
        let url = `https://oauth.zaloapp.com/v3/auth?app_id=${process.env.ZALO_APP_ID}&redirect_uri=${process.env.REDIRECT_URL}&state=${process.env.STATE}`;

        return res.redirect(url);
    }

    zaloCallbackGetCode(req, res) {
        console.log(req.query.code);
        
        res.send('hello world');
    }

    getAccessTokenByOauthCode(req, res) {
        let url = `https://oauth.zaloapp.com/v3/access_token?app_id=${process.env.ZALO_APP_ID}&app_secret=${process.env.ZALO_SECRET_KEY}&code=${process.env.ZALO_CODE}`
        axios.get(url)
        .then(res => {
            console.log(res.data);
            
        })
        .catch(err => {
            console.log('err');
        })
        // ZSClient.getAccessTokenByOauthCode(process.env.ZALO_CODE, function(response) {
        //     console.log(response.data);
            
        //     if (response && response.access_token) {
        //         ZSClient.setAccessToken(response.access_token);
        //     }
        // });
    }
}