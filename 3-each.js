/** 3-each
 * 1. receive two URLs as the first and second cmd args
 * 2. http.get, create two requests, console.log any errors
 */

const async = require('async');
const http = require('http');

async.each([process.argv[2], process.argv[3]], (item, done) => {
    http.get(item, res => {
        res.on('error', err => done(err));
    });
}, (err) => {
    if (err) console.log(err);
});

/**
 * What does async.each do?
 *       Parameters are:
 *      1. an array of values
 *      2. The function that you want to run the different values on.
 *      3. final callback
 *          The callback is passed error and ____________Something?
 *      runs in parallel
 */