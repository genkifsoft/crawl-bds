const RealEstateService = require('../../services/RealEstateService');
const RealEstate = new RealEstateService();

module.exports = class RealEstateController {
    constructor() {
        
    }

    async index(req, res) {
        console.log(111);

        await RealEstate.settingRequestService();
        await RealEstate.getListProduct();
        await RealEstate.gotoLinkChild();
    }
}