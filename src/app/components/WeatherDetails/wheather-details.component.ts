import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatButton } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherDetailsService } from './weather-details.service';
import { Position } from './Models/position.model';
import { CurrentConditions } from './Models/currentConditions.model';
import { Forecast } from './Models/forecast.model';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, map } from 'rxjs/operators';
import { Autocomplete } from './Models/autocomplete.model';
import { SharedDataService } from 'src/app/services/sharedData.service';
import { SharedService } from 'src/app/services/shared.service';
import {select, Store} from '@ngrx/store'; 
import { Observable } from 'rxjs';
import { Favorite } from '../favorites/favorite.model';
import { FavoriteAdd, FavoriteRemove } from '../favorites/favorite.actions';


@Component({
  selector: 'app-wheather-details',
  templateUrl: './wheather-details.component.html',
  styleUrls: ['./wheather-details.component.css']
})


export class WheatherDetailsComponent implements OnInit {
@Input('favSelectedID') favKey:string;  
  ApiKey ="m0XQhZB6q0A6ztq0GGWiBJpRRvdDQVXF"; //"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//ORIG "ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ"; sakyk1
  //rona "JBeC9zd7kA6K7RsFkOKDhGo3UPEpnZJM"
  //rona 1 m0XQhZB6q0A6ztq0GGWiBJpRRvdDQVXF
  message: string = "" ;

  todayDate:string;
  todayDay:string;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 
  key: string = "";
  currentCity : string = 'Tel Aviv';
  favoriteCity:string= "";
  favoriteKey:string = "";

  //currentCondition
  weatherText: string;
  temperature:number;
  weatherIcon:any;
  IsVisible:boolean= false;

  //5 days
  forecasts: Forecast[];
  date:Date;


  src:string;
  tempature: number;
   
  //autocomplete
  autocompletes: any;
  isLoading = false;
  errorMsg: string;
   

  favorites: Observable<Favorite[]>;  
  existInFavorites: boolean = false;
  btnTitle:string="Add";
  color:string = "primary";
  favArr = []; //Filter array
  addIndex:number= 0;

  weatherSearchForm = new FormGroup({
    city: new FormControl(this.currentCity,Validators.required)
  });

  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute,private weatherDetailsService: WeatherDetailsService,private shareDataService:SharedDataService,private sharedService:SharedService, private store: Store<{ favorites: Favorite[] }>) {    
    this.favorites = store.pipe(select('favorites')); 
  
     // //Send data to add favorite
     this.sharedService.setData('currentWeather',this.temperature);
     
     this.sharedService.setData('name',this.currentCity);

    //get data from favorite grid
    this.favoriteCity = this.sharedService.getDataValue('city');
    this.favoriteKey = this.sharedService.getDataValue('key');

    console.log('weather details get favorite city :' + this.favoriteCity);
    if (this.favoriteCity != null && this.favoriteCity != undefined && this.favoriteCity != "")
    {
      this.weatherSearchForm.controls['city'].setValue(this.favoriteCity);
      this.currentCity = this.favoriteCity;
      
      this.key = this.favoriteKey;
      this.fiveDaysForcastObs(this.key);
      this.currentConditionsObs(this.key);
    }
  }

  ngOnInit() {

    console.log('favKey' + this.favKey);

    this.favorites.pipe( 
      map(arr =>
         this.favArr = arr.filter( r => r.ID == this.key )
       )
   )
   .subscribe(results => {
     console.log('Search results:', results);
     if (results.length > 0)
     {
       console.log('Exist in favorites !');
       this.existInFavorites = true;
       this.btnTitle = "Remove";
       this.color = "warn";
     }
     else
     {
       console.log('Not exist in favorites !');
       this.existInFavorites = false;
       this.btnTitle = "Add";
       this.color = "primary";
     }
   });
   if (this.favArr.length > 0)
   {
      console.log('favArr[0].num : ' + this.favArr[0].num);
   }
   
   //Index for add to favorite
   this.favorites.pipe( 
    map(arr =>
       this.favArr = arr.filter( r => r.num > 0 )
     )
 )
 .subscribe(results => {
   console.log('Search all results length:', results.length);
   
   if (results.length > 0)
   {
     this.addIndex = results.length;
   }
   else
   {
     this.addIndex = this.addIndex;
   }
 });

    //Send data to add favorite
    this.sharedService.setData('currentWeather',this.tempature);
    this.sharedService.setData('name',this.GetControlValue(this.weatherSearchForm,'city'));

    this.todayDate = new Date().toLocaleDateString();

    var d = new Date();
    this.todayDay = this.days[d.getDay()];    
    
  
    if (this.currentCity == 'Tel Aviv')
    {
       //Tel Aviv - Default
       const lat = 32.109333;
       const lng =  34.855499;
       this.getLocation(lat,lng);
    }
     
  }

 public getLocation(lat:number,lng:number){
     try {
     this.weatherDetailsService.geoPosition(`${lat},${lng}`).subscribe(data => {
      console.log('Geoposition client data:' + JSON.stringify(data)); 
      this.key = data;
      if (this.key != undefined && this.key != null && this.key !="")
      {
        this.currentConditionsObs(this.key);
        this.fiveDaysForcastObs(this.key);
      }

     });
    }
    catch(e)
    {
      this.message = "geoPosition service error";
      console.log('geoPosition client failed ! exception :' + e);
    }
   }

 public locationAutocomplete(q:string):any {
  var response = this.weatherDetailsService.locationAutocomplete(q); 
  return response; 
 }
  
  public currentconditions(locationKey:string): any{
    let response :CurrentConditions[]; 
    try {
      
      response = this.weatherDetailsService.currentconditions(locationKey);
      this.temperature = response[0].Temperature.Metric.Value;
      this.weatherText = response[0].WeatherText;
      this.weatherIcon = response[0].WeatherIcon;

 
    }
    catch(e){
      this.message = "currentconditions service error" ;//+ e;
      console.log('currentconditions client failed ! exception :' + e);
    }
    return response;
  }
  
  public currentConditionsObs(locationKey:string): any{
    try {
    this.weatherDetailsService.currentconditionsObs(locationKey).subscribe(data => {
     console.log('currentConditionsObs client data:' + JSON.stringify(data)); 
     this.temperature = data[0].Temperature.Metric.Value;
     this.weatherText = data[0].WeatherText;
     this.weatherIcon = data[0].WeatherIcon;
     this.IsVisible = true;
    });
   }
   catch(e)
   {
     this.message = 'Current Conditions Service error ! ' + e;
     console.log('currentConditionsObs client failed ! exception :' + e);
   }
  }

  public fiveDaysForcast(locationKey:string){
    var response: Forecast[]; 
    try {
      response = this.weatherDetailsService.fiveDaysForecasts(locationKey)
      this.forecasts = response;
        console.log('5days client forecasts :' + JSON.stringify(this.forecasts));
      
    }
    catch(e){
      console.log('fiveDaysForecasts client failed ! exception :' + e);
    }
  }
  

  public fiveDaysForcastObs(locationKey:string){
    try {
    this.weatherDetailsService.fiveDaysForecastsObs(locationKey).subscribe(data => {
     console.log('fiveDaysForcastObs client data:' + JSON.stringify(data)); 
     this.forecasts = data;
    });
   }
   catch(e)
   {
    this.message = 'Five Days Forcast Service error ! ' + e;
 
     console.log('fiveDaysForcastObs client failed ! exception :' + e);
   }
  }


  public get f() {
    return this.weatherSearchForm.controls; 
  }
  
  go() {
    if (this.key != null && this.key!="" && this.key!=undefined){
      this.currentConditionsObs(this.key);
      this.fiveDaysForcastObs(this.key);     
    }
  }

  autocomplete(q: string){
    try {
      this.autocompletes = this.weatherDetailsService.locationAutocomplete(q);
      console.log('locationAutocomplete response :' + JSON.stringify(this.autocompletes));
      this.IsVisible = false; 
    }
    catch(e){
      this.message = 'Location Autocomplete Service error ! ' + e;

      console.log('locationAutocomplete client failed ! exception :' + e);
    }
  }

  autocomSelection(key:string){
    this.key = key;
    console.log('autocomplete selection key :' + key);
    if (this.key != undefined && this.key != null && this.key !="")
    {  
       this.currentCity = this.weatherSearchForm.get('city').value;       
       this.currentConditionsObs(this.key);
       this.fiveDaysForcastObs(this.key); 
       this.shareDataService.changeMessage(this.key);
    }
  }

  onCityChange(newValue:string){
    this.currentCity = newValue;
    console.log('onCityChange :' + newValue);
  }

  onChangeEvent(searchValue: string) {
    console.log('onChangeEvent searchValue :' + searchValue);
    this.color = "primary";
    var q = searchValue;
    const params = new HttpParams({fromObject: {apikey: this.ApiKey,q}}); 
    this.weatherSearchForm.get('city')
    .valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.message = "";
        this.autocompletes = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete`,{params})
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe(data => {
      if (data == undefined) { 
        this.message = data['Error'];
        //this.message = "Error autocomplete response data undefined";
        alert(this.message);

        this.autocompletes = [];
      } else {
        this.message = "";
        this.autocompletes = data;
      }

      console.log(this.autocompletes);
    });


  }

  onKeyUpEvent(searchValue:string){
    console.log('onKeyup searchValue :' + searchValue);
    this.color = "primary";

    var q = searchValue;
    const params = new HttpParams({fromObject: {apikey: this.ApiKey,q}}); 
    this.weatherSearchForm.get('city')
    .valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.message = "";
        this.autocompletes = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete`,{params})
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe(data => {
      if (data == undefined) { 
        this.message = data['Error'];
        //this.message = "Error  autocomplete response data undefined";
        this.autocompletes = [];
      } else {
        this.message = "";
        this.autocompletes = data;

      }

      console.log(this.autocompletes);
    });

  }

 goToFavorites(){
  let indx = 0;
  
  if (this.color == "primary")
  {
    this.AddFavorite(this.addIndex); 
  }
  else
  {
    if (this.favArr.length > 0 )
    {
      indx = this.favArr[0].num;
    }
    this.removeFavorite(indx);
  }
  this.router.navigate(['/favorites']);
 }


  public GetControlValue(form: FormGroup, field: string){
    console.log('field:' + field);

    let el = document.querySelector('input[name="'+field+'"]');
    console.log('value:' + form.get(field).value);

    return form.get(field).value;
}


AddFavorite(index:number) { 
  const favorite = new Favorite(); 
  favorite.num = index +1;
  favorite.name = this.currentCity;
  favorite.ID = this.key;
  favorite.currentWeather = this.temperature;
  this.store.dispatch(new FavoriteAdd(favorite)); 
}

removeFavorite(favoriteIndex) {
  console.log('index to delete :' + favoriteIndex);
  this.store.dispatch(new FavoriteRemove(favoriteIndex));
}

}
