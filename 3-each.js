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
