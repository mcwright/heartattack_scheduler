var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;


var url = process.env.nodeurl || process.argv[2] || "";
var port = process.env.nodeport || process.argv[3] || 3000;

var dbCtx = null;

MongoClient.connect(url, function(err, db) {

    if( err ){
        console.error( 'Error Opening DB Connection', err);
        return;
    }

    console.log( 'Database connection opened ');
    
    dbCtx = db.collection( 'theData' );
    app.listen(port, () => console.log('listening on port 3000'));
});


app.get('/historical', function (req, res) {
    var result = dbCtx.aggregate([{
        $group: {
            _id: { hospital: "$hospital", hourOfDay: { $substr:[ "$date", 11, 2] }},
            avgMinutes: { $avg: "$mostUrgentMinutes" },
            avgNumber: { $avg: "$mostUrgentNumber" }
        }
    }]);

    result.toArray( (err, docs) => {
        res.json( err || docs );
    });
});


app.get( '/all', (req, res) => {
    dbCtx.find({}).toArray( (err, docs) => {
        res.json( docs );
    });
});

