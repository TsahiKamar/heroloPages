import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Autocomplete } from './Models/autocomplete.model';
import { CurrentConditions } from './Models/currentConditions.model';
import { Forecast } from './Models/forecast.model';
import { GeoPosition } from './Models/geoPosition.model';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})

export class WeatherDetailsService {
 
  private CurrentConditions$ = new Subject<CurrentConditions[]>();
  private forcasts$ = new Subject<Forecast[]>();
  //rona JBeC9zd7kA6K7RsFkOKDhGo3UPEpnZJM
  //rona1 "m0XQhZB6q0A6ztq0GGWiBJpRRvdDQVXF"
  ApiKey = "p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//ORIG "ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ"; sakyk1
  //"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7"
  
  constructor(private http: HttpClient) { }
// http://dataservice.accuweather.com/currentconditions/v1/{locationKey}
// http://dataservice.accuweather.com/locations/v1/cities/autocomplete
// http://dataservice.accuweather.com/forecasts/v1/daily/5day/{locationKey}

   public currentconditions(q: string): any {
    var response = new Array<CurrentConditions>();
    const params = new HttpParams({fromObject: {apikey: this.ApiKey}}); 
    
    var locationKey = q;
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;//key //or locationKey
  
     this.http.get<CurrentConditions[]>(url,{params})
     .subscribe(data => {
       response = data; 
       console.log('server currentconditions response: ' + JSON.stringify(response));
      });      
      return response;
   }

   public currentconditionsObs(q: string): Observable<CurrentConditions[]> {
    const params = new HttpParams({fromObject: {apikey: this.ApiKey}}); 
     
    var locationKey = q;

    const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;//key //or locationKey
  
    this.http.get<CurrentConditions[]>(url,{params})
    .subscribe(data => this.CurrentConditions$.next(data));
     return this.CurrentConditions$;
  }
  
   public locationAutocomplete(q:string): any {
    var response = new Array<Autocomplete>(); 
    const params = new HttpParams({fromObject: {apikey: this.ApiKey,q}}); 
   
     const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete`;
 
     this.http.get<Autocomplete[]>(url,{params})
     .subscribe(data => {
      response = data; 
     }); 
     return response ;

   }

   public fiveDaysForecasts(locationKey:string): any {
    var response = Array<Forecast>();
    const params = new HttpParams({fromObject: {apikey: this.ApiKey}}); 
    
     const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`;     

     this.http.get<any>(url,{params})
     .subscribe(data => {
       response = data["DailyForecasts"]; 
       console.log('5 days server response :' + JSON.stringify(response));

      }); 
      return response;
   }

   public fiveDaysForecastsObs(locationKey:string): Observable<Forecast[]> {    
     const params = new HttpParams({fromObject: {apikey: this.ApiKey}}); 
     const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`;

     return this.http.get<Forecast[]>(url,{params})
     .pipe(
           map((forcasts: Forecast[]) => forcasts["DailyForecasts"])
          )
   }

  public geoPosition(q?): Observable<any>{
    const params = new HttpParams({fromObject: {apikey: this.ApiKey,q}});
    return this.http.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search`,{params})
    .pipe(
        map((geopos: GeoPosition) => geopos.Key)
    )
  }
  

}
