// const express = require('express')
// const app = express()

// function make_request() {
// app.get('/127.0.0.1/view_series', (req,res) => {
//     console.log(res)
// })

// } 
proxy( host, options);

var proxy = require('express-http-proxy');
var app = require('express')();

app.use('/proxy', proxy('localhost://5000'));

