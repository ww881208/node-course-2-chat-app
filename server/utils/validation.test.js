var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        var rtn = isRealString(12234);
        expect(rtn).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        var rtn = isRealString('       ');
        expect(rtn).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        var rtn = isRealString("what's up?");
        expect(rtn).toBeTruthy();
    });
});