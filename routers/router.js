const RealEstateController =  require('../app/controllers/NhaDatController');
const ClassRealEstate      = new RealEstateController();
const UserContorller =  require('../app/controllers/UserContorller');
const ClassUserContorller      = new UserContorller();

router.group("/bat-dong-san", (router) => {
    router.get('/', ClassRealEstate.index);
    router.post('/', ClassRealEstate.indexPost);
});


router.group("/zalo", (router) => {
    router.get('/', ClassUserContorller.index);
    router.get('/allow-access', ClassUserContorller.allowAccess);
    router.get('/callback', ClassUserContorller.zaloCallbackGetCode);
    router.get('/access-token', ClassUserContorller.getAccessTokenByOauthCode);
    router.get('/list-friends', ClassUserContorller.listFriends);
    router.get('/send-message', ClassUserContorller.sendMessage);
});



module.exports = router;