function SnsTrigger (event) {
    this.event = event;
}

SnsTrigger.prototype.getRecords = function() {
    if (!this.event.Records) {
        return null;
    }
    return this.event.Records;
}

module.exports = SnsTrigger;
