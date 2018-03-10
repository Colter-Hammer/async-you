
const http = require('http');
const async = require('async');
let url = process.argv[2];
let body = '';
var count = 0;

function HTTPget(callback) {
    http.get(url, res => {
        res.setEncoding('utf8');
        count++
        res.on('error', error => callback);
        res.on('data', data => body += data);
        res.on('end', () => callback(null, count));
    }).on('error', error => callback(error))
}

async.whilst(() => !body.trim().includes(body, 'meerkat')
    , HTTPget
    , (error, count) => {
        if (error) console.log(error);
        console.log(count);
    })