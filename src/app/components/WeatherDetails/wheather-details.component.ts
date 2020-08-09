import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatButton } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherDetailsService } from './weather-details.service';
//import { Combo } from './Models/combo.model';
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
 
  ApiKey = "p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//ORIG "ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ"; sakyk1


  todayDate:string;
  todayDay:string;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 
  key: string = "";
  currentCity:string = 'Tel Aviv';

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
      
    
  
    //orig
    // //Send data to add favorite
    // this.sharedService.setData('currentWeather',this.tempature);
    // //this.sharedService.setData('ID',this.key);
    //this.sharedService.setData('name',this.GetControlValue(this.weatherSearchForm,'city'));
    //this.sharedService.setData('name',this.currentCity);

     // //Send data to add favorite
     this.sharedService.setData('currentWeather',this.temperature);
     // //this.sharedService.setData('ID',this.key);
     //this.sharedService.setData('name',this.GetControlValue(this.weatherSearchForm,'city'));
  
      this.sharedService.setData('name',this.currentCity);
 
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
    //this.sharedService.setData('ID',this.key);
    this.sharedService.setData('name',this.GetControlValue(this.weatherSearchForm,'city'));

    this.todayDate = new Date().toLocaleDateString();

    var d = new Date();
    this.todayDay = this.days[d.getDay()];

    var f= this.f;
    const ApiKey = "p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//"p2wdfVchBYWwQxaC38tuxk9gmAAaEqn7";//ORIG "ORJR2fX39am8zZgGJyz9Msy6KRRtveEQ"; sakyk1
    
    
    //TEMP REMARK 
    // var q = this.weatherSearchForm.get('city').value;//this.currentCity;
    // const params = new HttpParams({fromObject: {apikey: ApiKey,q}}); 
    // this.weatherSearchForm.get('city')
    // .valueChanges
    // .pipe(
    //   debounceTime(500),
    //   tap(() => {
    //     this.errorMsg = "";
    //     this.autocompletes = [];
    //     this.isLoading = true;
    //   }),
    //   switchMap(value => this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete`,{params})
    //     .pipe(
    //       finalize(() => {
    //         this.isLoading = false
    //       }),
    //     )
    //   )
    // )
    // .subscribe(data => {
    //   if (data == undefined) { //data['Search'] == undefined) {
    //     //this.errorMsg = data['Error'];
    //     this.autocompletes = [];
    //   } else {
    //     this.errorMsg = "";
    //     this.autocompletes = data;//data['Search'];
    //   }

    //   console.log(this.autocompletes);
    // });

    if (this.currentCity == 'Tel Aviv')
    {
      //TEMP TEMP TEMP
      //this.autocompletes = this.weatherDetailsService.locationAutocomplete(this.currentCity);

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
      this.currentConditionsObs(this.key);
      //this.fiveDaysForcastObs(this.key);
     });
    }
    catch(e)
    {
      console.log('geoPosition client failed ! exception :' + e);
    }
   }

 public locationAutocomplete(q:string):any {
  var response = this.weatherDetailsService.locationAutocomplete(q); //currentWeatherSearch
  return response; 
 }
  
  // public currentconditions(locationKey:string): any{
  //   let response :CurrentConditions[]; 
  //   try {
      
  //     response = this.weatherDetailsService.currentconditions(locationKey);
  //     this.temperature = response[0].Temperature.Metric.Value;
  //     this.weatherText = response[0].WeatherText;
  //     this.weatherIcon = response[0].WeatherIcon;

 
  //   }
  //   catch(e){
  //     console.log('currentconditions client failed ! exception :' + e);
  //   }
  //   return response;
  // }
  
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
     console.log('currentConditionsObs client failed ! exception :' + e);
   }
  }

  // public fiveDaysForcast(locationKey:string){
  //   var response: Forecast[]; 
  //   try {
  //     response = this.weatherDetailsService.fiveDaysForecasts(locationKey)
  //     this.forecasts = response;
  //       console.log('5days client forecasts :' + JSON.stringify(this.forecasts));
      
  //   }
  //   catch(e){
  //     console.log('fiveDaysForecasts client failed ! exception :' + e);
  //   }
  // }
  

  public fiveDaysForcastObs(locationKey:string){
    try {
    this.weatherDetailsService.fiveDaysForecastsObs(locationKey).subscribe(data => {
     console.log('fiveDaysForcastObs client data:' + JSON.stringify(data)); 
     this.forecasts = data;
    });
   }
   catch(e)
   {
     console.log('fiveDaysForcastObs client failed ! exception :' + e);
   }
  }


  public get f() {
    return this.weatherSearchForm.controls; 
  }
  
  go() {
    if (this.key != null && this.key!="" && this.key!=undefined){
      this.currentConditionsObs(this.key);
      //this.fiveDaysForcastObs(this.key);     
    }
  }

  autocomplete(q: string){
    try {
      this.autocompletes = this.weatherDetailsService.locationAutocomplete(q);
      console.log('locationAutocomplete response :' + JSON.stringify(this.autocompletes));
      this.IsVisible = false; 
    }
    catch(e){
      console.log('locationAutocomplete client failed ! exception :' + e);
    }
  }

  autocomSelection(key:string){
    this.key = key;
    console.log('autocomplete selection key :' + key);
    if (this.key != undefined && this.key != null && this.key !="")
    {  
       console.log('autocompleteSelection with key!');
       this.currentCity = this.weatherSearchForm.get('city').value;       
       this.currentConditionsObs(this.key);
       //this.fiveDaysForcastObs(this.key); 

       this.shareDataService.changeMessage(this.key);
    }
  }

  onCityChange(newValue:string){
    this.currentCity = newValue;
    console.log('onCityChange :' + newValue);
  }

  onChangeEvent(searchValue: string) {
    console.log('onChangeEvent ..');
    this.IsVisible = false;
    var q = searchValue;
    const params = new HttpParams({fromObject: {apikey: this.ApiKey,q}}); 
    this.weatherSearchForm.get('city')
    .valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
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
        this.autocompletes = [];
      } else {
        this.errorMsg = "";
        this.autocompletes = data;
      }

      console.log(this.autocompletes);
    });


  }

  onKeyUpEvent(searchValue:string){
    console.log('onKeyup ..');
    this.IsVisible = false;
    var q = searchValue;//this.weatherSearchForm.get('city').value;//this.currentCity;
    const params = new HttpParams({fromObject: {apikey: this.ApiKey,q}}); 
    this.weatherSearchForm.get('city')
    .valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
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
        this.autocompletes = [];
      } else {
        this.errorMsg = "";
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
      indx = this.favArr[0].num -1;
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


childToParent(favSel){ //(name){
  this.key = favSel.key;//name;
  this.currentCity = favSel.city;
  //console.log('selected favorite key :' + name);
  console.log('favSel :' + JSON.stringify(favSel));
  this.go();
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
