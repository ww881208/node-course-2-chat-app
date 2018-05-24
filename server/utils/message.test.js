var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate  message object', () => {
        var from = 'Admin';
        var text = 'Hi there';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeTruthy();
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);
    });
});