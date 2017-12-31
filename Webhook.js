const request = require("request");
class Webhook {

    constructor(uri) {
        this.url = uri;

        // done with a request to "test" whether a valid webhook before continuing
        request(this.url, function (error, response, body) {
            console.log(body);

            if (error) console.log("Could not get webhook info: " + error);
            try {
                this.rawData = JSON.parse(body);
                this.token = this.rawData.token;
                this.id = this.rawData.id;
                this.webhookName = this.rawData.name;
                console.log("Created webhook called " + this.webhookName + " with token: " + this.token + " and ID: " + this.id);
            }
            catch (err) {
                console.log("Could not create webhook: " + err.stack)
            }
        });
    }

    sendMessage(title, msg) {
        try {
            var d = {
                "attachments": [{
                    "color": "#f797ff",
                    "fields": [{
                        "title": title,
                        "value": msg
                    }],
                    "ts": new Date() / 1000
                }]
            };
            request({
                url:this.url + "/slack",
                method:"POST",
                body:d,
                json:true
            }, (e,r,b) => {
                if (e) console.log(e);
                //if (r) console.log(r);
                if (b) console.log(b);
            });
        } catch (err) {
            console.log("Error: " + err.stack)
        }
    };
}

module.exports = Webhook;
