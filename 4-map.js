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

/**
 * What does async.map do?
 *      Passed an array of things/data/info etc as the first parameter
 *      Second parameter is the function you perform on the array. 
 *      Third paramter is the callback that receives error and an array of whatever is done by the function, whether the altered array, or the information from the array etc...
 *      runs in parallel
 */