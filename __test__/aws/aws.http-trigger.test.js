const Event = require('../../index');
const TEST_EVENT = require('./aws.http-trigger.event');
const event = new Event(TEST_EVENT).aws().httpTrigger();

test ('Headers value from AWS event', () => {
    expect(event.getHeaders()).toBe(TEST_EVENT.headers);
})

test ('Host value from AWS event', () => {
    expect(event.getHost()).toBe(TEST_EVENT.headers.Host);
})

test ('Method value from AWS event', () => {
    expect(event.getMethod()).toBe(TEST_EVENT.httpMethod.toLowerCase());
})

test ('Body value from AWS event', () => {
    expect(event.getBody()).toEqual(JSON.parse(TEST_EVENT.body));
})

test ('Query string value from AWS event', () => {
    expect(event.getQueryStrings()).toEqual(TEST_EVENT.queryStringParameters);
})

test ('Path parameter value from AWS event', () => {
    expect(event.getPathParameters()).toEqual(TEST_EVENT.pathParameters);
})

test ('Identity value from AWS event', () => {
    expect(event.getIdentity()).toEqual(TEST_EVENT.requestContext.identity);
})

test ('Api key value from AWS event', () => {
    expect(event.getApiKey()).toEqual(TEST_EVENT.requestContext.identity.apiKey);
})

