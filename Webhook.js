const request = require("request");
const endpoint = "https://discordapp.com/api/";
module.exports = class WebhookClass {
    constructor(uri) {
        this.url = uri;
        this.id = "";
        this.token = "";

        request(this.url, function (error, response, body) {
            if (error) {
                console.log("Could not get webhook info: "+error);
                return;
            }
            try {
                this.rawData = JSON.parse(body);
                this.token = this.rawData.token;
                this.id = this.rawData.id;
                this.webhookName = this.rawData.name;

                console.log("Created webhook called " + this.webhookName + " with token: "+this.token+" and ID: "+this.id);
            }
            catch (err) { console.log("Could not create webhook: "+err.stack) }
        });
    }
};
