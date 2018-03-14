function Azure (event) {
    this.event = event.req;
}

Azure.prototype.getHost = function () {
    return this.event.headers.host;
}

Azure.prototype.getHeaders = function () {
    return this.event.headers;
}

Azure.prototype.getMethod = function () {
    return this.event.method.toLowerCase();
}

Azure.prototype.getBody = function () {
    if (!this.event.body) {
        return null;
    }
    return this.event.body;
};

Azure.prototype.getIdentity = function () {
    return null;
}

Azure.prototype.getApiKey = function () {
    return null;
};

Azure.prototype.getQueryStrings = function() {
    if (!this.event.query) {
        return null;
    }
    return this.event.query;
};

Azure.prototype.getPathParameters = function() {
    if (!this.event.params) {
        return null;
    }
    return this.event.params;
};

Azure.prototype.getRecords = function() {
    return null;
}

Azure.prototype.getEndpoint = function() {
    if (this.event.originalUrl) {
        if (this.event.originalUrl.includes("?")) {
            return originalUrl.substr(0, originalUrl.indexOf("?"));
        }
        return this.event.originalUrl;
    }
    return null;
}

module.exports = Azure;
