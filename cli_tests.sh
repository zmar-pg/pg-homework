#!/usr/bin/env bash

set -e

test_hostname="localhost:3000"

curl_json() {
    curl $test_hostname -H "Accept: application/json" $@
}

curl_html() {
    curl $test_hostname -H "Accept: text/html" $@
}


# start the server
nodejs ./index.js & export ZMAR_HW_PID=$!
function cleanup {
    echo -e "\n\n-- killing zmar homework assignment app --"
    kill -9 $ZMAR_HW_PID
}
trap cleanup EXIT

# give time to bind sockets and such
sleep 1


##
## GET
##

# with json
# expands to: curl localhost:3000 -H "Accept: application/JSON" -X GET
echo -e "\n\nexpecting json message:"
curl_json -X GET

# with html
# expands to: curl localhost:3000 -H "Accept: text/html" -X GET
echo -e "\n\nexpecting html message:"
curl_html -X GET



##
## POST
##

# with json
# expands to: curl localhost:3000 -H "Accept: application/JSON" -X POST
# unlike the nodejs tests, this does not POST with data
echo -e "\n\nexpecting empty json message:"
curl_json -X POST

# with html
# expands to: curl localhost:3000 -H "Accept: text/html" -X POST
echo -e "\n\nexpecting empty html message:"
curl_html -X POST

