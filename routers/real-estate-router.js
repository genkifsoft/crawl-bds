const express = require('express');
const router = express.Router();

const RealEstateController =  require('../app/controllers/RealEstateController');
const ClassRealEstate      = new RealEstateController();
const UserContorller =  require('../app/controllers/UserContorller');
const ClassUserContorller      = new UserContorller();

// router.get('/', ClassRealEstate.index);
// router.get('/callback', ClassRealEstate.zaloCallbackGetCode);
// router.get('/access-token', ClassRealEstate.getAccessTokenByOauthCode);

router.get('/zalo/allow-access', ClassUserContorller.allowAccess);
router.get('/zalo/callback', ClassUserContorller.zaloCallbackGetCode);
router.get('/zalo/access-token', ClassUserContorller.getAccessTokenByOauthCode);

module.exports = router;