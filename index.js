// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var firebase = require('firebase');
var async = require('async');
var geolib = require('geolib');
var _ = require('underscore')
var env = require('node-env-file');
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

var ref = firebase.app().database().ref(dbName);
var pl = firebase.app().database().ref(dbPlaylist);

var usersRef = ref.child('users');
var appPort = process.env.APP_PORT;
var localFolderName =  process.env.LOCAL_FOLDER_NAME;

var logsRef = ref.child('loocadsPLLogs');
var detail = {imageId:'ads1', played:'y', deducted:'n', timestamp: new Date().toString()};
var playlist = pl.child('playlist3');
var playlisted = playlist.push(detail);

logsRef.child(playlisted.key).set(detail);

ref.child('loocadsPLLogs').on('child_changed', function(snap){
    console.log('changed', snap.val());
}) 
ref.child('loocadsPLLogs').on('child_changed', function(snap){
    console.log('value', snap.val());
}) 


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.APP_PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router