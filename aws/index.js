const HttpTrigger = require('./http-trigger');
const SnsTrigger = require('./sns-trigger');

function AWS (event) {
    this.event = event;
}

AWS.prototype.httpTrigger = function () {
    return new HttpTrigger(this.event);
}

AWS.prototype.SnsTrigger = function () {
    return new SnsTrigger(this.event);
}

module.exports = AWS;
