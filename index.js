// yay, js has const now apparently?
const express = require('express');

// globals are bad, but sharing with tests is nice
const JSON_MSG = {message: "Good morning"};
const HTML_MSG = "<p>Hello, World</p>";

function switch_accept(req, res) {
    if (req.accepts("application/json")) {
        res.json(JSON_MSG);
        return;
    }

    res.send(HTML_MSG);
}

function empty_body(req, res) {
    if (req.accepts('application/json')) { // the API is correctly pedantic here
        res.json({});
        return;
    }

    res.send('');
}

function start() {
    var app = express();

    // as per email, 200 and no body
    app.post('/', function(req, res) { empty_body(req, res); });
    app.get('/', function (req, res) { switch_accept(req, res); });
    
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
}

// if run from cli and not imported, start.
// this is the same as python's __name__ == __main__
if (require.main === module) {
    start();
}

module.exports = {
    switch_accept: switch_accept,
    empty_body: empty_body,

    JSON_MSG: JSON_MSG,
    HTML_MSG: HTML_MSG,
};
