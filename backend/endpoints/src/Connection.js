'use strict';
var MongoClient = require('mongodb').MongoClient;

class Connection {

    static open( url, collection ){
        return new Promise( (resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if( err ) reject( err );
                resolve( db.collection( collection ) );
            });
        });
    }
}

module.exports = Connection;