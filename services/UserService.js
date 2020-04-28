const defined = require('../config/define');

var UserService = new function() {
    this.type = "macintosh";
    this.color = "red";
    this.getAccessTokenByOauthCodeService = function () {
        return this.color + ' ' + this.type + ' apple';
    };
}

// class UserService {
//     constructor() {}

//     allowAccessService() {
//         let url = `https://oauth.zaloapp.com/v3/auth?app_id=${process.env.ZALO_APP_ID}&redirect_uri=${process.env.REDIRECT_URL}&state=${process.env.STATE}`;

//         return res.redirect(url);
//     }

//     // allow app access
//     zaloCallbackGetCodeService(req) {
//         const code = req.query.code;
//     }

//     getAccessTokenByOauthCodeService() {
//         console.log(this.data1);
//         return;
//         let url = `https://oauth.zaloapp.com/v3/access_token?app_id=${process.env.ZALO_APP_ID}&app_secret=${process.env.ZALO_SECRET_KEY}&code=${process.env.ZALO_CODE}`
//         axios.get(url)
//         .then(res => {
//             console.log(res.data);
//         })
//         .catch(err => {
//             console.log('err');
//         })
//         // ZSClient.getAccessTokenByOauthCode(process.env.ZALO_CODE, function(response) {
//         //     console.log(response.data);
            
//         //     if (response && response.access_token) {
//         //         ZSClient.setAccessToken(response.access_token);
//         //     }
//         // });
//     }
// }

// module.exports = UserService;