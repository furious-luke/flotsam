#!/bin/bash
PORT=6006
function checkPort {
    netstat -an | grep 6006 | grep -i listen | wc -l
}
yarn storybook -p $PORT --ci &
while [ $(checkPort) = 0 ]; do
    sleep 1
done
yarn loki update
kill %1
