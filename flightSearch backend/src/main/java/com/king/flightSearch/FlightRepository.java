package com.king.flightSearch;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

public interface FlightRepository extends CrudRepository<Flight, Long> {

    List<Flight> findByDepartureAndArrivalAndDepartureDateAndPassengersCount(@RequestParam String departure, @RequestParam String arrival, @RequestParam Date departureDate,@RequestParam Integer passengerCount);

}
