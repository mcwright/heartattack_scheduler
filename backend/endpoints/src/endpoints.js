var express = require('express');
var app = express();

var Connection = require( './Connection');
var Repository = require( './Repository');

var url = process.env.nodeurl || process.argv[2] || "";
var port = process.env.nodeport || process.argv[3] || 3000;

let repository;

Connection.open( url, 'theData').then( connection => {
    repository = new Repository( connection );
    app.listen( port, () => console.log( 'listening on port ' + port ));
},  error  => {
    console.error( "Database connection could not be established", error );
    process.exit(1);
});

/**
 * Returns raw data of all records
 */
app.get( '/all', (req, res) => {
    repository.getAllData()
        .then( data => res.json( data ), err => res.send( err ));
});

/**
 * A historical view broken down by hospital and hour of the day.
 */
app.get('/historical', (req, res) => {
    repository.getHistoricalData()
        .then( data => res.json( data ), err => res.send( err ));
});

/**
 * Returns latest data for all hospitals
 */
app.get( '/now', (req, res) => {
    res.send( 'no implementation');
});
