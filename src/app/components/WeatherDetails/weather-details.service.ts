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

//Api Key : ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ
export class WeatherDetailsService {
 
  private CurrentConditions$ = new Subject<CurrentConditions[]>();
  private forcasts$ = new Subject<Forecast[]>();

  ApiKey = "p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//ORIG "ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ"; sakyk1
  //"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7"
  
  //private location$ = new Subject<[]>();//orig <[]>

  constructor(private http: HttpClient) { }

// http://dataservice.accuweather.com/currentconditions/v1/{locationKey}
     // http://dataservice.accuweather.com/locations/v1/cities/autocomplete
// http://dataservice.accuweather.com/forecasts/v1/daily/5day/{locationKey}

   public currentconditions(q: string): any {
    var response = new Array<CurrentConditions>();
    const params = new HttpParams({fromObject: {apikey: this.ApiKey}}); 
    
    var locationKey = q;
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;//key //or locationKey

//      const CITIES =
//  [{LocalObservationDateTime:"2020-08-06T10:16:00+03:00",EpochTime:1596698160,WeatherText:"Clouds and sun",WeatherIcon:4,HasPrecipitation:false,PrecipitationType:null,IsDayTime:true,Temperature:{Metric:{Value:29.6,Unit:"C",UnitType:17},Imperial:{Value:85.0,Unit:"F",UnitType:18}},MobileLink:"http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",Link:"http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"}];


//    response =  CITIES;
//  return response;

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

 //   const CITIES =
//[{LocalObservationDateTime:"2020-08-06T10:16:00+03:00",EpochTime:1596698160,WeatherText:"Clouds and sun",WeatherIcon:4,HasPrecipitation:false,PrecipitationType:null,IsDayTime:true,Temperature:{Metric:{Value:29.6,Unit:"C",UnitType:17},Imperial:{Value:85.0,Unit:"F",UnitType:18}},MobileLink:"http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",Link:"http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"}];
//return CITIES;


    
    this.http.get<CurrentConditions[]>(url,{params})
    .subscribe(data => this.CurrentConditions$.next(data));
     return this.CurrentConditions$;
  }
  


  
  
  
   //http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ&q=Rom
   public locationAutocomplete(q:string): any {
    var response = new Array<Autocomplete>();

  //   const LOCATIONS = [
  //     {
  //     "Version": 1,
  //     "Key": "213490",
  //     "Type": "City",
  //     "Rank": 20,
  //     "LocalizedName": "Rome",
  //     "Country": {
  //        "ID": "IT",
  //        "LocalizedName": "Italy"
  //               },
  //     "AdministrativeArea": {
  //         "ID": "62",
  //         "LocalizedName": "Lazio"
  //                           }
  //     }
  //  ];
  //   return LOCATIONS;

 
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
    
     const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`;//key //locationKey
     
     ////DailyForecasts: []
    //  const FORECASTS =
    //  [
    //   {
    //     Date: "2020-08-05T07:00:00+03:00",
    //     EpochDate: 1596600000,
    //     Temperature: {
    //       Minimum: {
    //         Value: 77,
    //         Unit: "F",
    //         UnitType: 18
    //       },
    //       Maximum: {
    //         Value: 88,
    //         Unit: "F",
    //         UnitType: 18
    //       }
    //     },
    //     Day: {
    //       Icon: 2,
    //       IconPhrase: "Mostly sunny",
    //       HasPrecipitation: false
    //     },
    //     Night: {
    //     Icon: 34,
    //       IconPhrase: "Mostly clear",
    //       HasPrecipitation: false
    //     },
    //     Sources: [
    //       "AccuWeather"
    //     ],
    //     MobileLink: "http://m.accuweather.com/en/il/kiryat-atidim/215805/daily-weather-forecast/215805?day=1&lang=en-us",
    //     Link: "http://www.accuweather.com/en/il/kiryat-atidim/215805/daily-weather-forecast/215805?day=1&lang=en-us"
    //   },
      
    //   {
    //     Date: "2020-08-06T07:00:00+03:00",
    //     EpochDate: 1596600000,
    //     Temperature: {
    //       Minimum: {
    //         Value: 78,
    //         Unit: "F",
    //         UnitType: 18
    //       },
    //       Maximum: {
    //         Value: 89,
    //         Unit: "F",
    //         UnitType: 18
    //       }
    //     },
    //     Day: {
    //       Icon: 2,
    //       IconPhrase: "Mostly sunny",
    //       HasPrecipitation: false
    //     },
    //     Night: {
    //     Icon: 34,
    //       IconPhrase: "Mostly clear",
    //       HasPrecipitation: false
    //     },
    //     Sources: [
    //       "AccuWeather"
    //     ],
    //     MobileLink: "http://m.accuweather.com/en/il/kiryat-atidim/215805/daily-weather-forecast/215805?day=1&lang=en-us",
    //     Link: "http://www.accuweather.com/en/il/kiryat-atidim/215805/daily-weather-forecast/215805?day=1&lang=en-us"
    //   },
    //   {
    //     Date: "2020-08-07T07:00:00+03:00",
    //     EpochDate: 1596600000,
    //     Temperature: {
    //       Minimum: {
    //         Value: 70,
    //         Unit: "F",
    //         UnitType: 18
    //       },
    //       Maximum: {
    //         Value: 80,
    //         Unit: "F",
    //         UnitType: 18
    //       }
    //     },
    //     Day: {
    //       Icon: 2,
    //       IconPhrase: "Mostly sunny",
    //       HasPrecipitation: false
    //     },
    //     Night: {
    //     Icon: 34,
    //       IconPhrase: "Mostly clear",
    //       HasPrecipitation: false
    //     },
    //     Sources: [
    //       "AccuWeather"
    //     ],
    //     MobileLink: "http://m.accuweather.com/en/il/kiryat-atidim/215805/daily-weather-forecast/215805?day=1&lang=en-us",
    //     Link: "http://www.accuweather.com/en/il/kiryat-atidim/215805/daily-weather-forecast/215805?day=1&lang=en-us"
    //   }

    
    // ]; 
    //  return FORECASTS;


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
    return this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search`,{params})
    .pipe(
        map((geopos: GeoPosition) => geopos.Key)
    )
  }
  

}
