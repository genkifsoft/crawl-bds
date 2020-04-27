const Model = require('./Model');

module.exports = class Manufacturer extends Model {
    constructor() {
        super();

        this.land_area = '';
        this.bathroom = '';
        this.bedroom = [];
        this.juridical = '';// pháp lý
    }

    insertRealEstate() {

    }
}