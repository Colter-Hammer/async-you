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

function makeRequest(options, postData, callback) {
    postData = JSON.stringify(postData);
    const req = http.request(options, (res) => {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            body += chunk;
        });

    // Not writing anything to body
    console.log(body);

        res.on('end', () => {
            callback(null, body);
        });
    });

    // Only runs if there are errors in the request
    req.on('error', (e) => {
        callback(e);
    });

    // write data to request body
    req.write(postData);
    // console.log(req.write(postData));
    // console.log(postData);

    req.end();
}


async.series({
    post: seriesCallback => {

        // times
        let options = {
            hostname: process.argv[2],
            port: process.argv[3],
            path: '/users/create',
            method: 'POST'
        };

        async.times(5, (n, seriesCallback) => {
        let postData = {
            'user_id': n + 1
        };
        // console.log(postData);

        makeRequest(options, postData, seriesCallback);
    })
}
,
    get: (err, res) => {
        let options = {
            hostname: process.argv[2],
            port: process.argv[3],
            path: '/users',
            method: 'GET'
        };
        let body = '';
        res.on('data', data => body += data);
        callback(null, body);
        // makeRequest(options, null, callback);
    }
},  (err,result) => {
        if (err) console.log(err);
        console.log(result)
});