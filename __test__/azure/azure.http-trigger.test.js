const Event = require('../../index');
const TEST_EVENT = require('./azure.http-trigger.event');
const event = new Event(TEST_EVENT).azure().httpTrigger();

test ('Headers value from Azure event', () => {
    expect(event.getHeaders()).toBe(TEST_EVENT.req.headers);
})

test ('Host value from Azure event', () => {
    expect(event.getHost()).toBe(TEST_EVENT.req.headers.host);
})

test ('Method value from Azure event', () => {
    expect(event.getMethod()).toBe(TEST_EVENT.req.method.toLowerCase());
})

test ('Body value from Azure event', () => {
    expect(event.getBody()).toEqual(TEST_EVENT.req.body);
})

test ('Query string value from Azure event', () => {
    expect(event.getQueryStrings()).toEqual(TEST_EVENT.req.query);
})

