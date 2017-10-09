zmar homework
=============


Preface
-------

Clearly, there is a lot untested/uninformed here.

Typically, I avoid mocking at all costs.
Undefined behavior, latent errors, version mismatches, kernel bugs, etc. all
reside at layers underneath your application and to say the application can
be tested _without_ passing through those layers may be valid but is not one
I would recommend.


Things not tested:

1. `Accept` and `Content-Type`s not in the set of `(html, json)`
2. Framework specific idioms:
    * default error codes or response messages on 404, 500, etc
    * default `Accept` headers
    * etc
3. Mixed headers. I don't believe it is invalid to `Accept` both HTML and JSON.
4. ... about a million other things :)


Instructions
------------

#### Installing

I used NodeJS+ExpressJS simply because I'm more familiar with the API.
I would prefer Go's HTTP server, but that is more complicated for you to setup.
I have used django, but it's been a while and picking up idioms would take too long.

```
$ {package-manager} install nodejs
$ cd {THIS_DIRECTORY}
$ npm install
```


#### Starting

To start the server:

```
$ cd {THIS_DIRECTORY}
$ nodejs ./index.js
```


#### Testing

```
// for the mocked tests (test.js)
$ npm test

// for the CLI/curl tests (cli_tests.js)
// git should carry the +x flag, but if not.... chmod +x cli_tests.sh
$ ./cli_tests.js
```
