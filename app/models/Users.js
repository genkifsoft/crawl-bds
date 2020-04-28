const Model = require('./Model');

module.exports = class Users extends Model {
    setModel() {
        this._model = 'users';
    }

    constructor() {
        // this.setModel();
        super();

        this.fullname = '';
        this.date_birth = '';
    }

    zaloCallbackGetCode(req, res) {
        console.log(req.query.code);
        
        res.send('hello world');
    }
}