// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var firebase = require('firebase');
var async = require('async');
var _ = require('underscore')
var env = require('node-env-file');
var fs = require('fs');
env('.env');
var fb = firebase.initializeApp({ 
    apiKey: process.env.DB_KEY,
    authDomain: process.env.DB_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.DB_PROJECT_ID,
    storageBucket: process.env.DB_BUCKET,
    messagingSenderId: process.env.DB_SENDER_ID
  } );
const dbPlaylist = process.env.DB_PLAYLIST_NAME
const dbName = process.env.DB_NAME

var playlist = fs.readFileSync('playlist.json');
var playlistObj = JSON.parse(playlist);

var plRef = firebase.app().database().ref(dbPlaylist);
var campaignRef = firebase.app().database().ref(dbName);

var playlist = plRef.child('playlist2');
var campaign = campaignRef.child('loocads');
//var playlisted = playlist.push(playlistObj);

// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var port = process.env.APP_PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', router);

function listening() {
    console.log("Loocads API listening....");
}

//app.use(express.static('website'));

//app.get('/savePlaylisted', savePlaylisted);

router.post('/savePlaylisted', function(req, res) {
    //var test = playlist.push(playlistObj);
    var campaignKey = "-Kx97AMwtqmTwDYrTOaE";

    //const deductQtyF = deductQty(campaignKey, '666');
    //var tes = campaignRef.on('value', getQty, errData);
    var qty = '';
    var k = '';

    campaignRef.equalTo(campaignKey).on('value', function(snap) {
        campaign = snap.val();
        var keys = Object.keys(campaign);
        var body = {
            'quantity': 123
        };

        console.log("keys length : "+keys.length);

        var pengurang=1;

        for (var i = 0; i < keys.length; i ++ ) {
            k = keys[i];
            qty = campaign[k].quantity;

            console.log('K= '+k+' Qty= '+qty+' i= '+i);

            //qtyDed = qty.valueOf() - pengurang.valueOf();
            //deductQty(k, qty);  
            //i++;
            console.log('K= '+k+' Qty= '+qty+' i= '+i);
        }

        console.log("current quantity : "+qty);
    });

    //const d = deductQty(k, qty-1);
    //console.log('Campaign '+k+' has been deducted. Now the qty is '+qty);

    //console.log('Data playlist inserted');

});

function deductQty(key, qty) {
    var campaignReff = campaignRef.child(key);
    campaignReff.update({
        'quantity': qty
    });

    console.log('Campaign '+key+' has been deducted. Now the qty is '+qty);
}

function getQty(data) {
    var campaign = data.val();
    //var keys = Object.keys(campaign);

    //var quantity = campaign['-Kx97AMwtqmTwDYrTOaE'].quantity;

    console.log('qty:   '+campaign);
    //console.log('keys:   '+keys);

    /*for (var i = 0; i < keys.length; i ++ ) {
        var k = keys[i];

        var quantity = campaign[k].quantity;
    }*/
}

function errData(err) {
    console.log('Error eyy!');
    console.log(err);
}

//console.log(playlistObj);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Loocads API run on port ' + port);