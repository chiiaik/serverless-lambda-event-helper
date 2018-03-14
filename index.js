const AWS = require('./aws');
const Azure = require('./azure');

function Event(event) {
    this.event = event;
}

Event.prototype.aws = function () {
    return new AWS(this.event);    
}

Event.prototype.azure = function () {
    return new Azure(this.event);
}

module.exports = Event;
