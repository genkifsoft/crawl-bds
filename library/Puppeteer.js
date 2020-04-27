const puppeteer = require('puppeteer-extra');
const random_useragent = require('random-useragent');

module.exports = class Puppeteer {
    constructor() {
        this.args = [
            '--start-maximized',
            // '--proxy-server=socks4://14.161.0.62:4145',
            '--disable-setuid-sandbox', '--no-sandbox',
            '--lang=ja-JP,ja',
            '--media-cache-size=0', 
            '--disk-cache-size=0',
        ]

        this.setDefaultWaitFor();
    }

    setDefaultWaitFor() {
        return this.waitFor = 500;
    }

    async settingRequest() {
        this.browser = await puppeteer.launch({ ignoreHTTPSErrors: true,  headless: true, args: this.args })
        this.page = await this.browser.newPage();
        
        // Close poppup
        this.page.on('dialog', async dialog => {
            await dialog.dismiss();
        });
        await this.page.setViewport({ width: 1200, height: 1000 });
        await this.page.setRequestInterception(true);

        this.page.on("request", request => {
            if (
                ["image", "stylesheet", "font",
                "media", "texttrack",
                "object", "beacon", "csp_report",
                "imageset"].indexOf(
                    request.resourceType()
                ) !== -1
            ) {
                request.abort();
            } else {
                const headers = request.headers();
                headers['Accept-Language'] = 'ja';
                request.continue({headers});
            }
        });
    }

    async goToURL(url) {
        try {
            this.page.setUserAgent(random_useragent.getRandom());
            await this.page.goto(url, {
                waitUntil: 'networkidle2', timeout: 30000
            });
            // await this.page.waitFor(this.waitFor);
        } catch(exception) {
            return exception.message;
        }
    }

    async getTitlePage() {
        return await this.page.title();
    }

    delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }
}