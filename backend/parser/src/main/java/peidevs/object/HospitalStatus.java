package peidevs.object;

import com.mongodb.ReflectionDBObject;

import java.util.Date;

public class HospitalStatus extends ReflectionDBObject {
    private Date date;
    private String hospital;

    private int mostUrgentMinutes;
    private int mostUrgentNumber;

    private int urgentMinutes;
    private int urgentNumber;

    private int leastUrgentMinutes;
    private int leastUrgentNumber;

    private int totalBeingSeen;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }

    public int getMostUrgentMinutes() {
        return mostUrgentMinutes;
    }

    public void setMostUrgentMinutes(int mostUrgentMinutes) {
        this.mostUrgentMinutes = mostUrgentMinutes;
    }

    public int getMostUrgentNumber() {
        return mostUrgentNumber;
    }

    public void setMostUrgentNumber(int mostUrgentNumber) {
        this.mostUrgentNumber = mostUrgentNumber;
    }

    public int getUrgentMinutes() {
        return urgentMinutes;
    }

    public void setUrgentMinutes(int urgentMinutes) {
        this.urgentMinutes = urgentMinutes;
    }

    public int getUrgentNumber() {
        return urgentNumber;
    }

    public void setUrgentNumber(int urgentNumber) {
        this.urgentNumber = urgentNumber;
    }

    public int getLeastUrgentMinutes() {
        return leastUrgentMinutes;
    }

    public void setLeastUrgentMinutes(int leastUrgentMinutes) {
        this.leastUrgentMinutes = leastUrgentMinutes;
    }

    public int getLeastUrgentNumber() {
        return leastUrgentNumber;
    }

    public void setLeastUrgentNumber(int leastUrgentNumber) {
        this.leastUrgentNumber = leastUrgentNumber;
    }

    public int getTotalBeingSeen() {
        return totalBeingSeen;
    }

    public void setTotalBeingSeen(int totalBeingSeen) {
        this.totalBeingSeen = totalBeingSeen;
    }


}
