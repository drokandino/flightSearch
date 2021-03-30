package com.king.flightSearch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FlightController {

    @Autowired
    private FlightRepository flightRepository;

    public FlightController(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @PostMapping("/addFlight")
    void addFlight(@RequestBody Flight flight){
        flightRepository.save(flight);
    }


    @GetMapping("/getFlights/{departure}/{arrival}/{departureDate}/{passengers}")
    List<Flight> getFlights(@PathVariable String departure, @PathVariable String arrival, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd")  Date departureDate, @PathVariable Integer passengers){
        List<Flight> flights = flightRepository.findByDepartureAndArrivalAndDepartureDateAndPassengersCount(departure, arrival, departureDate, passengers);
        return flights;
    }
}
