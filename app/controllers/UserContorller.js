var UserService = require('../../services/UserService');

class UserContorller {
    constructor() {
        this.data1 =123;
    }

    async allowAccess(req, res) {
        return this._userService.allowAccessService();
    }

    zaloCallbackGetCode(req, res) {
        console.log(1);
        
        // return this._userService.zaloCallbackGetCodeService(req);
    }

    getAccessTokenByOauthCode(req, res) {
        console.log(UserService);
        
        // return this._userService.getAccessTokenByOauthCodeService();
    }
}

module.exports = UserContorller;