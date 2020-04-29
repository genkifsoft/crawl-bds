var UserService = require('../../services/UserService');
const _userService = new UserService;

class UserContorller {
    constructor() {}

    index(req, res) {
        return res.render('index');
    }

    allowAccess(req, res) {
        return _userService.allowAccessService(res);
    }

    zaloCallbackGetCode(req, res) {
        return _userService.zaloCallbackGetCodeService(req);
    }

    getAccessTokenByOauthCode(req, res) {
        return _userService.getAccessTokenByOauthCodeService(req);
    }

    async listFriends(req, res) {
        let result = await _userService.listFriendsService();

        return res.render('user/index', {data: result});
    }

    async sendMessage(req, res) {
        let result = await _userService.sendMessageService();

        // return res.render('user/index', {data: result});
    }
}

module.exports = UserContorller;