var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct loation object', () => {
        var from = 'wei';
        var longitude = 15;
        var latitude = 15;
        var url ='https://www.google.com/maps?q=' + latitude + ',' + longitude

        var message = generateLocationMessage(from, longitude, latitude);

        expect(message.from).toEqual(from);
        expect(message.url).toEqual(url);
        //expect(message.createdAt).toBeA('number');
    });

     
});