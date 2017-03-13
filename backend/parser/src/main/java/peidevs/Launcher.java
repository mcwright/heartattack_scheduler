/**
 * Created by sean on 2017-03-04.
 * data source is here https://mlab.com/home
 * user: “heartAttackScheduler”
 * password: “password1"
 */
package peidevs;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import peidevs.parser.HospitalSiteParser;
import peidevs.parser.Parser;
import peidevs.services.MongoService;
import peidevs.services.Service;


public class Launcher {
    public static void main( String args[]){
        final Logger logger = LogManager.getLogger( Launcher.class );

        String url = "mongodb://name:password@ds119020.mlab.com:19020";
        String databaseName = "heartattack";
        String collectionName = "theData";
        String healthWebsiteURL = "http://www.healthpei.ca/erWaitTimes/";

        try {
            Service mongoDAO = new MongoService( url, databaseName, collectionName);
            Parser parser = new HospitalSiteParser(healthWebsiteURL);


            while( true ){
                new NotMain().runOnce(parser, mongoDAO);
                Thread.sleep( 5 * 1000 * 60 );
            }
        }catch( Exception e){
            logger.error( "Something Crazy in Main is happening", e );
        }
    }
}
