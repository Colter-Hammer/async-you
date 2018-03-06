/** 4-map
 * 1. receive two urls as the first two cmd args
 * 2. http.get
 * 3. use async.map to get the results of each request.
 */

const async = require('async');
const http = require('http');

async.map([process.argv[2], process.argv[3]], (items, done) => {
    let body = '';
    http.get(items, res => {
        res.on('error', () => done(err)
        );
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => done(null, body));
    });
}, (err, results) => {
    if (err) console.log(err);
    console.log(results);
});
