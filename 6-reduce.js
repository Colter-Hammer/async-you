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

function HTTPget(sum, item, callbackToReduce) {


    // Set the URL to equal the url given in cmd + an item ['one', 'two', 'three'] as a query parameter
    http.get(`${url}?number=${item}`, res => {

        // sets encoding to utf8 making the res body a string
        res.setEncoding('utf8');

        // If there is an error, call the callback
        res.on('error', error => {
            callbackToReduce(err)
        });
        res.on('data', data => {
            sum += Number(data);
        });
        res.on('end', () => {
            // Test if the GET request is being completed successfully
            // console.log('GET completed');
            callbackToReduce(null, sum);
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

    /**
 * What does async.reduce do?
 *      the exact same thing as map, but async
 */