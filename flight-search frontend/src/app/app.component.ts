import { Component } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { NumberSymbol } from '@angular/common';
import { Flight } from './FlightInterface'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    
    //Input variables
    departure = "";
    arrival = "";
    departureDate = "";
    adultSeats = "";
    currencyCode = "";

    flights: Flight[] = [];
    tmpFlightObject = <Flight>{};

    //API base URL
    dataApiUrl = "https://test.api.amadeus.com/v2";

    //Backend URL
    backendUrl = "http://localhost:8080/";

    //Variable to store access token
    accessToken = "";   
    

    constructor(private http: HttpClient){
        this.getAccessToken()
        
    }    
    
    
    
    getAccessToken(){
        //Server link for accessing auth tokens
        let authServerUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
        
        //Post body parameters
        let authPostBody = new HttpParams()
        .set("grant_type", "client_credentials")
        .set("client_id", "S2QIcUml1UDw5zfBKGARrf74lyNwAlJD")
        .set("client_secret", "fjMNeX2D6P4JqHSp")
        
        //Post headers
        let authHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post<any>(authServerUrl, authPostBody.toString(), {headers: authHeaders}).subscribe(data => {
            console.log(data);
            this.accessToken = data.access_token;
            console.log(this.accessToken);
        })
    }

    getDataFromApi(){
        //Get header with accessToken
        let dataGetHeaders = new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.accessToken)
        
        let getUrl = this.dataApiUrl + "/shopping/flight-offers?"

        //construct get link from given parameters
        //example getUrl += "originLocationCode=ZAG&destinationLocationCode=FRA&departureDate=2021-11-01&adults=1&nonStop=false&max=250"
        getUrl += "originLocationCode=" + this.departure + "&destinationLocationCode=" + this.arrival
                + "&departureDate=" + this.departureDate + "&adults=" + this.adultSeats;

        //If currency was given
        if(this.currencyCode.length > 0)
            getUrl += "&currencyCode=" + this.currencyCode;

        this.http.get<any>(getUrl, {headers: dataGetHeaders}).subscribe(data =>{
            console.log("API data", data);
            
            data = data.data;
            this.flights = [];
            for (let index of Object.keys(data)){

                this.flights.push({departure: this.departure, 
                                   arrival: this.arrival, 
                                   departureDate: this.departureDate as unknown as Date, 
                                   numberOfStopovers: (data[index].itineraries[0].segments.length as number - 1),
                                   price: data[index].price.total,
                                   currency: data[index].price.currency,
                                   passengersCount: this.adultSeats as unknown as number});
            
            }
            this.saveData();
        })
    }
    

    saveData(){
        console.log( "saving");
        let postUrl = this.backendUrl + "/addFlight";
        for(let flight of this.flights){
            
            this.http.post(postUrl, flight).subscribe(res => {
                //console.log(res);
                
            })
        }
    }
    
    submit(){
        //Delete pervious data
        this.flights = [];
        
        //Check if query exists on local server
        let backendGetUrl = this.backendUrl + "getFlights/" + this.departure + "/" + this.arrival + "/" + this.departureDate + "/" + this.adultSeats;
        this.http.get<Flight[]>(backendGetUrl).subscribe(data => {

            data.forEach((element: Flight) => {
                this.flights.push(element)
            });

            /*for (var flight of data){
               this.flights.push(flight) 
            }*/
            
            //If there is no data on local server, get data from api
            if(this.flights.length == 0){
                console.log(this.flights.length);    
                this.getDataFromApi();
            }
        })

                            
    }

    
    showData(){
        console.log(this.flights);

    }


}
