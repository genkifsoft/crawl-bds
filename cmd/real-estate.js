require('dotenv').config();
const RealEstateClass = require('../services/RealEstateService');
const RealEstate = new RealEstateClass;

(async () => {

    await RealEstate.settingRequestService();
    await RealEstate.getListProduct();
    await RealEstate.gotoLinkChild();
    
})();
