var request = require('request'),
    assert = require('assert');

describe('GET /', function () {
    it("user UNAUTHORIZED should respond with status 200", function (done) {
        request('http://localhost:3000/api/personals', function (err, resp) {
            assert.equal(resp.statusCode, 200);
            done();
        });
    });
});