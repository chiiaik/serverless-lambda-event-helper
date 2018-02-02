function EventHelper(event) {
    this.event = event;

    this.getHeaders = function () {
        return this.event.headers;
    }

    this.getBody = function() {
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
        
        let identity = this.getIdentity();

        if (identity.apiKey) {
            return null;
        }

        let apiKey = identity.apiKey;
        
        return apiKey;
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

    this.getRecords = function() {
        if (!this.event.Records) {
            return null;
        }
        return this.event.Records;
    }
}
module.exports = EventHelper;
