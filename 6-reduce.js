/** 6-reduce
 * 1. receive a URL as the first cmd argument
 * 2. Send a GET request to the url with a query parameter named number
 *      number = ['one', 'two', 'three'];
 * 3. Convert the response body to Number and add it to the revious value. 
 * 4. Console.log the final reduced value
 */

const async = require('async');
const http = require('http');
let url = process.argv[2];



function HTTPget(memo, item, callbackToReduce) {

    // Set the URL to equal the url given in cmd + an item ['one', 'two', 'three'] as a query parameter
    http.get(`${url}?${item}`, res => {
        let body = 0;
        // sets encoding to utf8 making the res body a string
        res.setEncoding('utf8');

        // If there is an error, call the callback
        res.on('error', error => callbackToReduce(err));


        res.on('data'), data => {
            body += data;
            console.log('Body: ' + body);
            console.log('Data: ' + data);
        };
        res.on('end', () => {
            console.log('GET completed');
            callbackToReduce(null, body);
        });
    }).on('error', callbackToReduce);
};

async.reduce(['one', 'two', 'three']

    // initial value    
    , 0

    // function call to do the GET request
    , HTTPget

    // final callback to print results/error
    , (err, data) => {
        if (err) console.log(err);
        console.log(data);
    });