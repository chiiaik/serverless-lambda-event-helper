function HttpTrigger (event) {
    this.event = event;
}

HttpTrigger.prototype.getHost = function () {
    return this.event.headers.Host;
}

HttpTrigger.prototype.getHeaders = function () {
    return this.event.headers;
}

HttpTrigger.prototype.getMethod = function () {
    return this.event.httpMethod.toLowerCase();
}

HttpTrigger.prototype.getBody = function () {
    if (!this.event.body) {
        return null;
    }
    try {
        return JSON.parse(this.event.body);
    } catch (error) {

    }
    return null;
};

HttpTrigger.prototype.getIdentity = function () {
    if (!this.event.requestContext ||
        !this.event.requestContext.identity) {
        return null;
    }

    return this.event.requestContext.identity;
}

HttpTrigger.prototype.getApiKey = function () {
    if (!this.event.requestContext ||
        !this.event.requestContext.identity ||
        !this.event.requestContext.identity.apiKey) {
        return null;
    }

    return this.event.requestContext.identity.apiKey;
};

HttpTrigger.prototype.getQueryStrings = function() {
    if (!this.event.queryStringParameters) {
        return null;
    }
    return this.event.queryStringParameters;
};

HttpTrigger.prototype.getPathParameters = function() {
    if (!this.event.pathParameters) {
        return null;
    }
    return this.event.pathParameters;
};

HttpTrigger.prototype.getEndpoint = function() {
    if (!this.event.headers && 
        !this.event.requestContext && 
        !this.event.requestContext.path) {
        return null;
    }
    let protocol = this.event.headers['X-Forwarded-Proto'];
    return (protocol ? protocol : 'http') + '://' + this.event.headers.Host + this.event.requestContext.path;
}

module.exports = HttpTrigger;
