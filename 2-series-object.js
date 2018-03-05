/** 2-series-object
 * 1. receive 2 URLs as the first & second command line arguments. 
 *      process.argv[2,3];
 * 2. Use http.get to send a get request to the callbacks and pass the body of the response as the callback
 * 3. Set the responses to an object with the property names 'requestOne', 'requestTwo'
 * 4. console.log the results as the final callback.
 */

const http = require('http');
const async = require('async');

async.series({
    requestOne: callback => {
        let body = '';
        http.get(process.argv[2], res => {
            res.on('error', err => callback(err));
            res.on('data', data => body += data);
            res.on('end', () => callback(null, body));
        })
    },
    requestTwo: callback => {
        let body = '';
        http.get(process.argv[3], res => {
            res.on('error', err => callback(err));
            res.on('data', data => body += data);
            res.on('end', () => callback(null, body));
        })
    }
}, (err, results) => {
    console.log(results);
})