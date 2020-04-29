const defined = require('../config/define');

class UserService {
    constructor() {}

    allowAccessService(res) {
        let url = `https://oauth.zaloapp.com/v3/auth?app_id=${process.env.ZALO_APP_ID}&redirect_uri=${process.env.REDIRECT_URL}&state=${process.env.STATE}`;

        return res.redirect(url);
    }

    // allow app access
    zaloCallbackGetCodeService(req) {
        const code = req.query.code;
        console.log(code);
        
    }

    getAccessTokenByOauthCodeService() {
        var accessToken = [];
        let url = `https://oauth.zaloapp.com/v3/access_token?app_id=${process.env.ZALO_APP_ID}&app_secret=${process.env.ZALO_SECRET_KEY}&code=${process.env.ZALO_CODE}`
        console.log(url);
        
        axios.get(url)
        .then(res => {
            accessToken = res.data;
        })
        .catch(err => {
            console.log('err');
        })

        return accessToken;
    }

    async listFriendsService() {
        var result = [];
        let url = `https://graph.zalo.me/v2.0/me/invitable_friends?access_token=${process.env.ZALO_ACCESS_TOKEN}&offset=0&limit=500&fields=id,name,gender,picture`
        console.log(url);
        
        await axios.get(url)
        .then(res => {
            result = res.data;
        })
        .catch(err => {
            console.log('err');
        })

        return result;
    }

    async sendMessageService() {
        var result = [];
        let url = `https://graph.zalo.me/v2.0/me/message?access_token=${process.env.ZALO_ACCESS_TOKEN}&message=Thử thách bản thân với các bài toán kỹ thuật hóc búa&link=https://developers.zalo.me/&to=4649489011940746761`
        console.log(url);
        
        await axios.post(url)
        .then(res => {
            result = res.data;
        })
        .catch(err => {
            console.log('err');
        })

        return result;
    }
}

module.exports = UserService;