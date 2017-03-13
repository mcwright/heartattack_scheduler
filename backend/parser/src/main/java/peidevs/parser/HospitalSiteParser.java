package peidevs.parser;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import peidevs.object.HospitalStatus;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 */
public class HospitalSiteParser implements Parser {
    private final Logger logger = LogManager.getLogger( HospitalSiteParser.class );
    private final String url;

    public HospitalSiteParser( String url ){
        this.url = url;
    }


    @Override public List<HospitalStatus> parse(){
        List<HospitalStatus> hospitalStatuses = new ArrayList<HospitalStatus>();
        try {
            Document document = Jsoup.connect(url).get();

            Elements hospitalNames = document.select("span.hospitalTitle");
            Elements hospitalData = document.select( "table.mainTable");
            Elements patients = document.select("div.patients");

            int i = 0;
            for( Element element : hospitalData ){
                HospitalStatus hospitalStatus = new HospitalStatus();

                Elements hospitalConditions = element.select( "tbody tr");
                Element mostUrgentData = hospitalConditions.get( 0 );
                Element urgentData = hospitalConditions.get( 2 );
                Element leastUrgentData = hospitalConditions.get( 4 );

                hospitalStatus.setDate( new Date() );
                hospitalStatus.setHospital( hospitalNames.get( i ).text());

                hospitalStatus.setMostUrgentNumber(  parsePatientsWaiting( mostUrgentData.select( "td").get(1).text() ));
                hospitalStatus.setMostUrgentMinutes( getWaitTimeInMinutes( mostUrgentData.select( "td").get(2).text() ) );

                hospitalStatus.setUrgentNumber( parsePatientsBeingSeen( urgentData.select( "td").get(1).text())  );
                hospitalStatus.setUrgentMinutes( getWaitTimeInMinutes( urgentData.select( "td").get(2).text() ) );

                hospitalStatus.setLeastUrgentNumber( parsePatientsBeingSeen( leastUrgentData.select( "td").get(1).text() ));
                hospitalStatus.setLeastUrgentMinutes( getWaitTimeInMinutes( leastUrgentData.select( "td").get(2).text() ) );

                hospitalStatus.setTotalBeingSeen( parsePatientsBeingSeen( patients.get( i ).text()));

                hospitalStatuses.add(hospitalStatus);
                i++;
            }

        }catch( Exception e){
            logger.error( "Error parsing URL ", e );
        }

        return hospitalStatuses;
    }

    /**
     *
     * @param text
     * @return
     */
    private int parsePatientsWaiting( String text ){

        try {
            return Integer.parseInt(text);
        }catch( NumberFormatException e ){
            logger.info( "Unable to parse numer of patients waiting for - " + text );
            return -1;
        }
    }

    /**
     *
     * @param text
     * @return
     */
    private int parsePatientsBeingSeen(String text) {
        int index = text.lastIndexOf( " ");

        return Integer.parseInt( text.substring( index+1, text.length()));
    }

    /**
     *
     * @param td
     * @return
     */
    private int getWaitTimeInMinutes(String td) {
        if( td.startsWith( "<")){
            return 30;
        } else if( td.contains( "-" )){
            int dashIndex = td.indexOf( '-');
            int value = Integer.parseInt( td.substring(0,dashIndex));
            return (value*60)+30;
        } else {
            logger.info( "Wait time format was not supported - " + td );
            return -1;
        }
    }
}
