const Event = require('../../index');
const TEST_EVENT = require('./azure.http-trigger.event');
const event = new Event(TEST_EVENT).azure().httpTrigger();

test ('2.1 Headers value from Azure event', () => {
    expect(event.getHeaders()).toBe(TEST_EVENT.req.headers);
})

test ('2.2 Host value from Azure event', () => {
    expect(event.getHost()).toBe(TEST_EVENT.req.headers.host);
})

test ('2.3 Method value from Azure event', () => {
    expect(event.getMethod()).toBe(TEST_EVENT.req.method.toLowerCase());
})

test ('2.4 Body value from Azure event', () => {
    expect(event.getBody()).toEqual(TEST_EVENT.req.body);
})

test ('2.5 Query string value from Azure event', () => {
    expect(event.getQueryStrings()).toEqual(TEST_EVENT.req.query);
})

