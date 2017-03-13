package peidevs;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import peidevs.object.HospitalStatus;
import peidevs.parser.Parser;
import peidevs.services.Service;

import java.util.List;

public class HospitalParser {
    private final Logger logger = LogManager.getLogger(NotMain.class);
    private final Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm").create();

    public void runOnce(Parser parser, Service mongoDAO) {
        List<HospitalStatus> hospitalStatuses = parser.parse();

        for(HospitalStatus hospitalStatus : hospitalStatuses){
            String output = gson.toJson(hospitalStatus);

            mongoDAO.save( output );
            logger.info( "Wrote hospitalStatus - " + output );
        }
    }
}
