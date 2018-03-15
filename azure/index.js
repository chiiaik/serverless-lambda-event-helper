const HttpTrigger = require('./http-trigger');

function Azure (event) {
    this.event = event;
}

Azure.prototype.httpTrigger = function () {
    return new HttpTrigger(this.event);
}

module.exports = Azure;
