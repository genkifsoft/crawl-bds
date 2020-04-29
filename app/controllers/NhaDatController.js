const RealEstateService = require('../../services/NhaDatService');
const _realEstate = new RealEstateService();
const page = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

class RealEstateController {
    constructor() {}

    async index(req, res) {
        // await _realEstate.settingRequestService();

        // for (const item of page) {
        //     await _realEstate.getListProduct(item);
        //     await _realEstate.gotoLinkChild();
        // }
       
        let result = await _realEstate.danhSachNhaDat();

        return res.render('index', {data: result});
    }

    indexPost(req, res) {
        console.log('req'+ req.query);
    }
}

module.exports = RealEstateController;