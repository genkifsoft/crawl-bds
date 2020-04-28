const defined = require('../config/define');
const Puppeteer = require('../library/Puppeteer');
var RealEstateModel = require('../app/models/RealEstate');
var ManufacturerModel = require('../app/models/Manufacturer');
var RealEstate = new RealEstateModel;
var Manufacturer = new ManufacturerModel;
const chalk = require('chalk');
const log = console.log;
var fs = require('fs');

module.exports = class RealEstateService extends Puppeteer {
    constructor() {
        super();
    }

    async settingRequestService() {
        return await this.settingRequest();
    }

    async getListProduct() {
        let url = process.env.URL_NATIONWIDE;

        return await this.goToURL(url);
    }

    getLinkInItem() {
        // link, price, address, data post
        return this.page.$$eval(".list-item-container",
        elements => elements.map(item => item.querySelector('.list-item__link').getAttribute('href')), 
        element => element.length > 0 && element.length != undefined);
    }

    async gotoLinkChild() {
        let listLink = await this.getLinkInItem();
        for(const link of listLink) {
            await this.goToURL(link);
            // set data to mdoel
            log(chalk.blue('START URL: ') +  chalk.green(link));

            await this.getTitle();
            await this.getLocationClock();
            await this.getDatePost();
            await this.getPhone();
            await this.getPersonal();
            await this.gtePageAllView();
            await this.getPrice();
            await this.getContent();
            await this.getListImage();
            await this.manufacturer();

            // RealEstate = new RealEstateModel;
            try {
                let dataParse = JSON.stringify(RealEstate);
                let toRevert = JSON.parse(dataParse);
                delete toRevert._model;
                toRevert.list_image = JSON.stringify(toRevert.list_image);
                this.result = RealEstate.saveOrFail(toRevert);

                if (process.env.SENDMESSAGE) {
                    client.messages
                    .create({
                        body: toRevert.title,
                        from: process.env.FROM,
                        mediaUrl: [toRevert.list_image],
                        to: process.env.TO
                    }).then(message => console.log(message.sid));
                }
               
            } catch(exception) {
                console.log('exception.message'+exception.message);
                return this.result = exception.message;
            }
        }

        return this;
    }

    async getTitle() {
        RealEstate.title = await this.page.evaluate(() => {
            return document.querySelector('.title').textContent;
        });

        return RealEstate;
    }

    async getLocationClock() {
        let checkExistsInfo = await this.page.$('.location-clock__location').then(res => !! res);
        if (checkExistsInfo) {
            RealEstate.address_origin = await this.page.evaluate(() => {
                return document.querySelector('.location-clock__location').textContent;
            });
        }

        return RealEstate;
    }

    async getPrice() {
        let checkExistsInfo = await this.page.$('.detail-container__left .price-container__value').then(res => !! res);
        if (checkExistsInfo) {
            RealEstate.price = await this.page.evaluate(() => {
                return document.querySelector('.detail-container__left .price-container__value').textContent;
            });
        }
        
        return RealEstate;
    }

    async getDatePost() {
        let checkExistsInfo = await this.page.$('.location-clock__clock').then(res => !! res);
        if (checkExistsInfo) {
            RealEstate.date_post = await this.page.evaluate(() => {
                return document.querySelector('.location-clock__clock').textContent;
            });
        }

        return RealEstate;
    }

    async getPhone() {
        let checkExistsInfo = await this.page.$('.mobile-container__link').then(res => !! res);
        if (checkExistsInfo) {
            await this.page.$eval('.mobile-container__link', elem => elem.click());
            RealEstate.phone = await this.page.evaluate(() => {
                return document.querySelector('.user-info-container .user-info__content .mobile-container__value span:nth-child(1)').innerText;
            });
        }

        return RealEstate;
    }

    async getPersonal() {
        let checkExistsInfo = await this.page.$('.user-info-container .user-info__content .user-info__fullname').then(res => !! res);
        if (checkExistsInfo) {
            RealEstate.personal_post = await this.page.evaluate(() => {
                return document.querySelector('.user-info-container .user-info__content .user-info__fullname').textContent;
            });
    
        }
       
        return RealEstate;
    }

    async getListImage() {
        RealEstate.list_image = await this.page.evaluate(
            () => [...document.querySelectorAll('.image-container .image-container__image')]
                  .map(element => element.getAttribute('src'))
          );

        if (RealEstate.list_image.length > 0) return RealEstate;
        RealEstate.list_image = await this.page.evaluate(
            () => [...document.querySelectorAll('.image-container .image__slides img')]// networkidle2
                  .map(element => element.getAttribute('src'))
          );

        return RealEstate;
    }

    async gtePageAllView() {
        RealEstate.page_all_view = await this.page.evaluate(() => {
            if (document.querySelector('.user-info__content .user-info__link') != null) {
                return document.querySelector('.user-info__content .user-info__link').href;
            }
        });

        return RealEstate;
    }

    async getContent() {
        RealEstate.content = await this.page.$eval('.body-container', ( el => el.textContent));

        return RealEstate;
    }

    // more info realestate
    async manufacturer() {
        let checkExistsInfo = await this.page.$('.tect-content-block .tech-item').then(res => !! res);
        if (checkExistsInfo) {
            let data = await this.page.$$eval(".tect-content-block .tech-item", elements => elements.map(item => {
                return {
                    tech_item_name: item.querySelector('.tech-item__name') != null ? item.querySelector('.tech-item__name').innerText :'',
                    tech_item_value: item.querySelector('.tech-item__value') != null ? item.querySelector('.tech-item__value').innerText : '',
                }
            }));
    
            data.forEach(element => {
                if (element.tech_item_name.indexOf(defined.info_real_estate.land_area) != -1) {
                    Manufacturer.land_area = element.tech_item_value;
                }
    
                if (element.tech_item_name.indexOf(defined.info_real_estate.bathroom) != -1) {
                    Manufacturer.bathroom = element.tech_item_value;
                }
    
                if (element.tech_item_name.indexOf(defined.info_real_estate.bedroom) != -1) {
                    Manufacturer.bedroom = element.tech_item_value;
                }
    
                if (element.tech_item_name.indexOf(defined.info_real_estate.juridical) != -1) {
                    Manufacturer.juridical = element.tech_item_value;
                }
            });
        }

        return Manufacturer;
    }
}