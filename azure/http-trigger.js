function HttpTrigger (event) {
    this.event = event.req;
}

HttpTrigger.prototype.getHost = function () {
    return this.event.headers.host;
}

HttpTrigger.prototype.getHeaders = function () {
    return this.event.headers;
}

HttpTrigger.prototype.getMethod = function () {
    return this.event.method.toLowerCase();
}

HttpTrigger.prototype.getBody = function () {
    if (!this.event.body) {
        return null;
    }
    return this.event.body;
};

HttpTrigger.prototype.getIdentity = function () {
    return null;
}

HttpTrigger.prototype.getApiKey = function () {
    return null;
};

HttpTrigger.prototype.getQueryStrings = function() {
    if (!this.event.query) {
        return null;
    }
    return this.event.query;
};

HttpTrigger.prototype.getPathParameters = function() {
    if (!this.event.params) {
        return null;
    }
    return this.event.params;
};

HttpTrigger.prototype.getEndpoint = function() {
    if (this.event.originalUrl) {
        if (this.event.originalUrl.includes("?")) {
            return originalUrl.substr(0, originalUrl.indexOf("?"));
        }
        return this.event.originalUrl;
    }
    return null;
}

module.exports = HttpTrigger;
