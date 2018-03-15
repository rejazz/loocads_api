var express     = require('express');
var fs          = require('fs');
var app         = express();

var data = fs.readFileSync('playlist.json');
var words = JSON.parse(data);

console.log(words);