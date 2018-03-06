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
        res.on('end', () => {
            callback(null, body);
        });
    });

    req.on('error', (e) => {
        callback(e);
    });

    // write data to request body
    req.write(postData);
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

        const postData = {
            'msg': 'Hello World!'
        };

        makeRequest(options, postData, seriesCallback);




    },
    get: callback => {
        let options = {
            hostname: process.argv[2],
            port: process.argv[3],
            path: '/users',
            method: 'GET'
        };
        makeRequest(options, null, callback);
    }
});
