const Event = require('../index');
const TEST_EVENT = require('./aws/aws.http-trigger.event');
const ENDPOINT = 'https://ldem7kezdf.execute-api.ap-southeast-1.amazonaws.com/dev/v1/realtime/subscriptions';

function cloneEvent (event) {
    let e = null;
    try {
        e = JSON.parse(JSON.stringify(event));
    } catch (e) {}
    return e;
}

test ('3.1 Headers value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);
    expect(event.getHeaders()).toBe(testEvent.headers);
})

test ('3.2 Host value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);
    expect(event.getHost()).toBe(testEvent.headers.Host);
})

test ('3.3 Method value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);
    expect(event.getMethod()).toBe(testEvent.httpMethod.toLowerCase());
})

test ('3.4 Body value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);
    expect(event.getBody()).toEqual(JSON.parse(testEvent.body));
})

test ('3.4.1 No body value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    delete testEvent.body;
    let event = new Event(testEvent);
    expect(event.getBody()).toBeNull();
})

test ('3.4.2 No body value from AWS event as body is not a JSON string', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    testEvent.body = 'I am not a JSON string';
    let event = new Event(testEvent);
    expect(event.getBody()).toBeNull();
})

test ('3.5 Query string value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);
    expect(event.getQueryStrings()).toEqual(testEvent.queryStringParameters);
})

test ('3.5.1 No query string value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    delete testEvent.queryStringParameters;
    let event = new Event(testEvent);
    expect(event.getQueryStrings()).toBeNull();
})

test ('3.6 Path parameter value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);
    expect(event.getPathParameters()).toEqual(testEvent.pathParameters);
})

test ('3.6.1 No path parameter value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    delete testEvent.pathParameters;
    let event = new Event(testEvent);
    expect(event.getPathParameters()).toBeNull();
})

test ('3.7 Identity value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);
    expect(event.getIdentity()).toEqual(testEvent.requestContext.identity);
})

test ('3.7.1 No identity value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    delete testEvent.requestContext.identity;

    let event = new Event(testEvent);
    expect(event.getIdentity()).toBeNull();

    delete testEvent.requestContext;
    expect(event.getIdentity()).toBeNull();
})

test ('3.8 Api key value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);
    expect(event.getApiKey()).toEqual(testEvent.requestContext.identity.apiKey);
})

test ('3.8.1 Api key value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    delete testEvent.requestContext.identity.apiKey;
    let event = new Event(testEvent);
    expect(event.getApiKey()).toBeNull();

    delete testEvent.requestContext.identity;
    expect(event.getApiKey()).toBeNull();

    delete testEvent.requestContext;
    expect(event.getApiKey()).toBeNull();
})

test ('3.9 Endpoint value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);
    expect(event.getEndpoint()).toEqual(ENDPOINT);
})

test ('3.9.1 No endpoint value from AWS event', () => {
    let testEvent = cloneEvent(TEST_EVENT);
    let event = new Event(testEvent);

    delete testEvent.requestContext.path;
    expect(event.getEndpoint()).toBeNull();

    delete testEvent.requestContext;
    expect(event.getEndpoint()).toBeNull();

    delete testEvent.headers;
    expect(event.getEndpoint()).toBeNull();
})
