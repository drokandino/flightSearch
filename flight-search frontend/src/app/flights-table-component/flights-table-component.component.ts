import { Flight } from './../FlightInterface';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-flights-table-component',
  templateUrl: './flights-table-component.component.html',
  styleUrls: ['./flights-table-component.component.css'],
})
export class FlightsTableComponentComponent implements OnInit {
    
    //Input decorator, function is called when change in input is detected
    @Input() set flightObjects(flights: Flight[]){
        this.flightsObject = flights;
    }

    //List of objects with flights data
    flightsObject: Flight[] = []; 

    //Table columns names
    tableColumnNames = ["departure", "arrival", "departureDate", "numberOfStopovers", "passengersCount", "price", "currency"];
    
    constructor() { }

    ngOnInit(): void {
    }

 
}
