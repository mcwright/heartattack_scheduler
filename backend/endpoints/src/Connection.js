'use strict';
var MongoClient = require('mongodb').MongoClient;

let connection;

class Connection {

    static open( url, collection ){
        return new Promise( (resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if( err ){
                    reject( err );
                }
            
                connection = db.collection( collection );
                resolve( connection );
            });
        });
    }
}

module.exports = Connection;