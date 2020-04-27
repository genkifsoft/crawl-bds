const fs         = require('fs');
const csv        = require('csvtojson')
const { parse }  = require('json2csv');
var loadHeader   = false;

module.exports = class File {
    constructor() {
        this.folderCSV  = 'assets/csv/';
        this.inputFile  = 'companylist.csv';
        this.outputFile = 'companylist_output.csv';

        // this.initClearDataInFile();
    }

    // clear all data in file output
    initClearDataInFile() {
        return fs.writeFile(this.folderCSV + this.outputFile, '', function(){})
    }

    // read file
    async readCSVData() {
        return await csv().fromFile(this.folderCSV + this.inputFile);
    }

    
    // Processing export data field
    exportFileToCsv(input) {
        const fields = ["Master ID","CompanyName","Address"];
        var json2csvParser = parse(input, fields);
        // load header add to file company_output
        if (loadHeader) {
            json2csvParser = json2csvParser.split('\n');
            json2csvParser = json2csvParser[1];
        }

        return this.exportFile(json2csvParser);
    }

    // export file csv with name comapny_output
    async exportFile(data) {
        loadHeader = true;
        return fs.appendFile(this.folderCSV + this.outputFile, data+ '\n', function(err){
            if(err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }

    deleteONERowCsv(data, lines = []) {
        return data
              .split('\n')
              .filter((val, idx) => lines.indexOf(idx) === -1)
              .join('\n');
    }

    formatDataAfterRemoveInCsvInput(data) {
        let that = this;
        fs.readFile(that.folderCSV + that.inputFile, 'utf8', function(err, data) {
            return fs.writeFile(that.folderCSV + that.inputFile, that.deleteONERowCsv(data, [1]), function(error){});
        });
    }
}