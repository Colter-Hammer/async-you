/**
 * 1. Write a program that reads the contents of a file
 *  a. file is provided through process.argv[2]
 * 2. create a GET request to the url given, and console.log the response
 *  
 */

const async = require('async');
const http = require('http');
const fs = require('fs');


// Read a file given through process.argv[2] to get the URL.
function read(callback) {
    // console.log(process.argv[2]);
    fs.readFile(process.argv[2], 'UTF8', callback);
}

//Send a get request to the URL given and print the contents of the body
function response(url, callback) {
    let body = '';
    // console.log(url);
    http.get(url, res => {
        res.on('data', data => body += data.toString());
        res.on('end', () => callback(null, body));
    }).on('error', err => callback(err));
}



async.waterfall([
    read,
    response,
], (err, res) => {
    if (err) console.error(err);
    console.log(res);
});
