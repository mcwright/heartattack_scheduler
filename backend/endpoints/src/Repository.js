'use strict';

let _connection;

class Repository {
    constructor( connection ){
        _connection = connection;
    }

    getAllData( ){
        return new Promise( (resolve, reject) => {
            _connection.find({}).toArray( (err, docs) => {
                if( err ) reject( err );
                resolve( docs );
            });
        });
    }

    getHistoricalData( ){
        return new Promise( ( resolve, reject ) => {
            _connection.aggregate([{
                $group: {
                    _id: { hospital: "$hospital", hourOfDay: { $substr:[ "$date", 11, 2] }},
                    mostUrgentAvgMinutes: { $avg: "$mostUrgentMinutes" },
                    mostUrgentAvgNumber: { $avg: "$mostUrgentNumber" },
                    urgentAvgMinutes: { $avg: "$urgentMinutes" },
                    urgentAvgNumber: { $avg: "$urgentNumber" },
                    leastUrgentAvgMinutes: { $avg: "$leastUrgentMinutes" },
                    leastUrgentAvgNumber: { $avg: "$leastUrgentNumber" },
                    numberBeingSeen : { $avg: "$totalBeingSeen" }
                }
            }]).toArray((err, docs) => {
                if( err ) reject( err );
                resolve( docs );
            });
        });
    }

    getRecentInformation(){
        return new Promise((resolve,reject) => {
            _connection.find()
                    .sort( { date : -1 })
                    .limit( 1 )
                    .toArray( (err, docs) => {
                        if( err ) reject( err );
                        
                        var mostRecentTimestamp = docs[0].date;
                        _connection.find( { date : mostRecentTimestamp}).toArray((err, docs) => {
                            if( err ) reject( err);
                            resolve( docs );
                        });
                    });
        })
    }
}

module.exports = Repository;