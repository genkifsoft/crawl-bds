const express       = require('express');
const RealEstateRouter = express.Router();

const RealEstateController =  require('../app/controllers/RealEstateController');
const ClassRealEstate      = new RealEstateController();

RealEstateRouter.get('/', ClassRealEstate.index);

module.exports = RealEstateRouter;