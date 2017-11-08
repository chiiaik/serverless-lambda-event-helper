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

    this.getApiKey = function() {
        if (!this.event.requestContext ||
            !this.event.requestContext.identity ||
            !this.event.requestContext.identity.apiKey) {
            return null;
        }

        let apiKey = this.event.requestContext.identity.apiKey;
        
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
}
module.exports = EventHelper;
