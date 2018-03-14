function AWS (event) {
    this.event = event;
}

AWS.prototype.getHost = function () {
    return this.event.headers.Host;
}

AWS.prototype.getHeaders = function () {
    return this.event.headers;
}

AWS.prototype.getMethod = function () {
    return this.event.httpMethod.toLowerCase();
}

AWS.prototype.getBody = function () {
    if (!this.event.body) {
        return null;
    }
    try {
        return JSON.parse(this.event.body);
    } catch (error) {

    }
    return null;
};

AWS.prototype.getIdentity = function () {
    if (!this.event.requestContext ||
        !this.event.requestContext.identity) {
        return null;
    }

    return this.event.requestContext.identity;
}

AWS.prototype.getApiKey = function () {
    
    let identity = this.getIdentity();

    if (identity.apiKey) {
        return null;
    }

    let apiKey = identity.apiKey;
    
    return apiKey;
};

AWS.prototype.getQueryStrings = function() {
    if (!this.event.queryStringParameters) {
        return null;
    }
    return this.event.queryStringParameters;
};

AWS.prototype.getPathParameters = function() {
    if (!this.event.pathParameters) {
        return null;
    }
    return this.event.pathParameters;
};

AWS.prototype.getRecords = function() {
    if (!this.event.Records) {
        return null;
    }
    return this.event.Records;
}

AWS.prototype.getEndpoint = function() {
    if (!this.event.headers && 
        !this.event.requestContext && 
        !this.event.requestContext.path) {
        return null;
    }
    let protocol = this.event.headers['X-Forwarded-Proto'];
    return (protocol ? protocol : 'http') + '://' + this.event.headers.Host + this.event.requestContext.path;
}

module.exports = AWS;
