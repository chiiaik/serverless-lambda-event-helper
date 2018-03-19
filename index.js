const AWS = require('./aws');
const Azure = require('./azure');

function Event(event) {
    this.event = event;
    
    this.getHost = function () {
        return this.event.headers.Host;
    }
    
    this.getHeaders = function () {
        return this.event.headers;
    }
    
    this.getMethod = function () {
        return this.event.httpMethod.toLowerCase();
    }
    
    this.getBody = function () {
        if (!this.event.body) {
            return null;
        }
        try {
            return JSON.parse(this.event.body);
        } catch (error) {
    
        }
        return null;
    };
    
    this.getIdentity = function () {
        if (!this.event.requestContext ||
            !this.event.requestContext.identity) {
            return null;
        }
    
        return this.event.requestContext.identity;
    }
    
    this.getApiKey = function () {
        if (!this.event.requestContext ||
            !this.event.requestContext.identity ||
            !this.event.requestContext.identity.apiKey) {
            return null;
        }
    
        return this.event.requestContext.identity.apiKey;
    };
    
    this.getQueryStrings = function() {
        if (!this.event.queryStringParameters) {
            return null;
        }
        return this.event.queryStringParameters;
    };
    
    this.getPathParameters = function() {
        if (!this.event.pathParameters) {
            return null;
        }
        return this.event.pathParameters;
    };
    
    this.getEndpoint = function() {
        if (!this.event.headers && 
            !this.event.requestContext && 
            !this.event.requestContext.path) {
            return null;
        }
        let protocol = this.event.headers['X-Forwarded-Proto'];
        return (protocol ? protocol : 'http') + '://' + this.event.headers.Host + this.event.requestContext.path;
    }
}

Event.prototype.aws = function () {
    return new AWS(this.event);    
}

Event.prototype.azure = function () {
    return new Azure(this.event);
}

module.exports = Event;
