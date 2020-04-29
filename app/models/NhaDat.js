const Model = require('./Model');

module.exports = class RealEstate extends Model {
    constructor() {
        super();
        this._model = 'realestate';

        this.title = '';
        this.price = '';
        this.list_image = [];
        this.phone = '';
        this.address_origin = '';
        this.date_post = '';
        this.personal_post = '';
        this.page_all_view = '';
        this.content = '';
    }

}