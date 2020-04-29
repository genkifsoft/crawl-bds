module.exports = class Model {
    constructor() {
        // this.result['data'] = Array();
        // this.result['error'] = null;
        // this.define = require('../../config/define');
    }

    saveOrFail(data) {
        return new Promise(function(resolve, reject) {
            let sql = "INSERT INTO " + this._model + " SET ?";
            let that = this;
            db.query(sql, data, function(error, result, fields) {
                if (error) return reject(error);
                
                return resolve(result);
            });
        }.bind(this));
    }

    selectAll(filed = '*') {
        return new Promise(function(resolve, reject) {
            let sql = `SELECT ${filed} FROM ${this._model}`;
            let that = this;
            db.query(sql, function(error, result, fields) {
                if (error) return reject(error);
                
                return resolve(result);
            });
        }.bind(this));
    }

    firstOrFail(id) {
        return new Promise(function(resolve, reject) {
            let sql = "SELECT * FROM `" + this._model + "` where id = ? limit 1";
            let that = this;
            db.query(sql, id, function(error, rows, fileds) {
                if (error) return reject(error);
                if (rows.length < 1) return resolve(that.define.msg.code_404);

                return resolve(rows[0]);
            });
        }.bind(this))
    }

    updateOrFail(fileds, data) {
        return new Promise(function(resolve, reject) {
            let sql = "UPDATE `" + this._model + "` SET "+ fileds +" WHERE id = ?";
            let that = this;
            db.query(sql, data, function(error, result) {
                if (error) return reject(error);
                if (Boolean(result.changedRows) == false) {
                    return resolve(that.define.msg.code_304);
                }
                
                return resolve(result);
            });
        }.bind(this));
    }
}