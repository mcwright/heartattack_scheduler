package peidevs.services;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

/**
 *
 */
public class MongoService implements Service {
    private static MongoCollection collection = null;

    /**
     *
     */
    public MongoService( String url, String databaseName, String collectionName ){
        if( collection == null ){
            MongoClientURI uri = new MongoClientURI(url + "/" + databaseName);
            MongoClient mongo = new MongoClient( uri );

            MongoDatabase db = mongo.getDatabase( databaseName);
            collection = db.getCollection(collectionName);
        }
    }

    /**
     *
     * @param output
     */
    @Override public void save(String output) {

        Document doc = Document.parse( output );
        collection.insertOne( doc );
    }

}
