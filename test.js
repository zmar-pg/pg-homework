const hw = require("./index.js");

const assert = require('assert');
const MockRequest = require('mock-express-request');
const MockResponse = require('mock-express-response');

// yearning for static typing
function assert_ty(input, ty) {
    if (!(typeof(input) == ty)) {
        msg = "expected input to be a " + ty;
        if (typeof Error !== "undefined") { // for js supporting Error
            throw new Error(msg);
        }
        throw msg; // for older JS versions
    }
}

function make_req(method, url, json) {
    assert_ty(method, "string");
    assert_ty(url, "string");
    assert_ty(json, "boolean");

    var headers = {};
    var body = "";

    if (json) {
        if (method === 'GET') {
            headers['Accept'] = 'application/json';
        } else if (method === 'POST') {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            body = hw.JSON_MSG;
        }

    } else {
        headers['Accept'] = 'text/html'
        if (method === 'GET') {
        } else if (method === 'POST') {
            headers['Content-Type'] = 'text/html';
            body = hw.HTML_MSG;
        }
    }

    return new MockRequest({
        method: method,
        hostname: 'localhost',
        url: url,
        headers: headers,
        body: body,
    });
}

function make_res() {
    return new MockResponse();
}


//
// GET
//

describe('GET', function() {
    describe('as_json', function() {
        it('should return JSON: \'{"message": "Good morning"}\'', function() {
            var req = make_req("GET", "/", true);
            var res = make_res();

            // call the route
            hw.switch_accept(req, res);
            assert.equal(200, res.statusCode);

            const json_res = res._getJSON();
            assert.equal(Object.keys(json_res).length, 1);  // has one key
            assert.equal(json_res.message, hw.JSON_MSG.message); // expected key and ==
        });
    });

    describe('as_html', function() {
        it('should return HTML: "<p>Hello, World</p>"', function() {
            var req = make_req("GET", "/", false);
            var res = make_res();

            // call the route
            hw.switch_accept(req, res);
            assert.equal(200, res.statusCode);

            assert.equal(res._getString(), hw.HTML_MSG);

            try {
                var as_json = res._getJSON();
                assert.true(false, "was able to get json");
            } catch(err) {
                // expected
            }
        });
    });
})

describe('POST', function() {
    describe('as_json', function() {
        it('should return empty ("{}") OK', function() {
            var req = make_req("POST", "/", true);
            var res = make_res();

            // call the route
            hw.empty_body(req, res);
            assert.equal(200, res.statusCode);

            const res_string = res._getString();
            assert.equal(res_string.length, 2);
            assert.equal(res_string, "{}");
        });

    });

    describe('as_html', function() {
        it('should return empty OK', function() {
            var req = make_req("POST", "/", false);
            var res = make_res();

            // call the route
            hw.empty_body(req, res);
            assert.equal(200, res.statusCode);

            assert.equal(res._getString().length, 0);
        });
    });
})
