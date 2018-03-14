const Event = require('../index');
const TEST_EVENT = {
    headers: {
        headerKey: 'headerValue',
    },
    body: JSON.stringify({
        bodyKey: 'bodyValue',
    }),
    queryStringParameters: {
        queryKey: 'queryValue',
    }
};

test ('AWS lambda event headers', () => {
    let event = new Event(TEST_EVENT).aws();
    expect(event.getHeaders()).toBe(TEST_EVENT.headers);
})
