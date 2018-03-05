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

// // adds a user incrementing the id by one every time.
// let addUser = (id, callback) => {
//     callback(null, { user_id: id + 1 });
// }

// // async.times to do the addUser function several times.
// let times = async.times(5, (n, done) => {
//     addUser(n, (err, user) => done(err, user));
// }, (err, users) => {
//     if (err) console.log(err);
//     console.log(JSON.stringify(users));
// })

let options = {
    hostname: process.argv[2],
    port: process.argv[3],
    path: '/users/create',
    method: 'POST'
}

let url = process.argv[2];
const req = http.request(url + '/users/create/', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

const postData = JSON.stringify({
    'msg': 'Hello World!'
});
// write data to request body
req.write(postData);
req.end()