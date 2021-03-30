package com.king.flightSearch;

import org.springframework.core.SpringVersion;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Flight implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long flightId;

    private String departure;
    private String arrival;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date departureDate;

    private Integer passengersCount;
    private Integer numberOfStopovers;
    private Float price;
    private String currency;

    public Flight(){
        super();
    }

    public Flight(long flightId, String departure, String arrival, Date departureDate, Integer passengersCount, Integer numberOfStopovers, Float price, String currency) {
        this.flightId = flightId;
        this.departure = departure;
        this.arrival = arrival;
        this.departureDate = departureDate;
        this.passengersCount = passengersCount;
        this.numberOfStopovers = numberOfStopovers;
        this.price = price;
        this.currency = currency;
    }

    public long getFlightId() {
        return flightId;
    }

    public void setFlightId(long flightId) {
        this.flightId = flightId;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public Integer getPassengersCount() {
        return passengersCount;
    }

    public void setPassengersCount(Integer passengersCount) {
        this.passengersCount = passengersCount;
    }

    public Integer getNumberOfStopovers() {
        return numberOfStopovers;
    }

    public void setNumberOfStopovers(Integer numberOfStopovers) {
        this.numberOfStopovers = numberOfStopovers;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    @Override
    public String toString() {
        return "Flight{" +
                "flightId=" + flightId +
                ", departure='" + departure + '\'' +
                ", arrival='" + arrival + '\'' +
                ", departureDate=" + departureDate +
                ", passengersCount=" + passengersCount +
                ", numberOfStopovers=" + numberOfStopovers +
                ", price=" + price +
                ", currency='" + currency + '\'' +
                '}';
    }
}
