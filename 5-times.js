/** 5-times
 * 1. Program that recieves two cmd args that contain hostname and port
 * 2. http.request to do a POST request to 
 * `url + '/users/create'`
 *  body should contain a JSON.stringify object: 
 * `{"user_id": 1}
 * 3. Do the same thing 5 times incrementing the user_id by one each time. 
 * 
 * 4. Send a GET request to:
 * `url + '/users'`
 * console.log response from the GET request. 
 */

// Necessary modules for the request, and async functions
const async = require('async');
const http = require('http');

function makePost(options, postData, cb) {
    const req = http.request(options, res => {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', data => body += data);
        res.on('end', () => cb(null, body));
        res.on('error', cb);
    })

    req.on('error', cb);
    req.write(JSON.stringify(postData));
    req.end();
}

function postReq(postCB) {
    // Set the options for the POST
    let options = {
        hostname: process.argv[2],
        port: process.argv[3],
        path: '/users/create',
        method: 'POST'
    }

    async.times(5, (n, done) => {
        let postData = { 'user_id': n + 1 };
        makePost(options, postData, done);
    }, postCB)
}

function getReq(getCB) {
    // sets options for GET
    let options = {
        hostname: process.argv[2],
        port: process.argv[3],
        path: '/users',
        // method: 'GET'
    };

    // Creates GET request
    http.get(options, res => {
        let body = '';
        res.setEncoding('utf8');
        res.on('error', error => getCB(error));
        res.on('data', data => body += data);
        res.on('end', () => getCB(null, body));
    })
}

async.series({
    post: postReq,
    get: getReq
}, (err, result) => {
    if (err) console.log(err);
    console.log(result.get);
})

/**
 * What does async.times do?
 *      receives as the parameters:
 *      1. the number of times you want to do something
 *      2. the function you are going to perform those times
 *      3. callback
 */