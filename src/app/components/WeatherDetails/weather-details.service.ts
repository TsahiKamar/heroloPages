import { Injectable } from '@angular/core';
// //import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Combo} from './combo.model';


@Injectable({
  providedIn: 'root'
})
export class WeatherDetailsService {
  cityArr: Combo[] = [];

  constructor(private http: HttpClient) { }
  
  public GetCities() : any[]{   
         
             //this.cityComboArr = new Array<Combo>();
              const CITIES = [{code:111,name:'Tel-Aviv'},
                              {code:123,name:'London'},
                              {code:234,name:'Rome'}
             ];
              return CITIES ;
         }

   //public WeatherSearch(): any {

    
   //}      
// http://dataservice.accuweather.com/currentconditions/v1/{locationKey}

     // http://dataservice.accuweather.com/locations/v1/cities/autocomplete

     
// http://dataservice.accuweather.com/forecasts/v1/daily/5day/{locationKey}

   public currentWeatherSearch(city: string): any {
    //Student[] {
    //this.students = new Array<Student>();
     //ORIG this.http.get<any>('http://localhost:52555/api/Values/GetStudents?' + 'positionName=' + positionName + '&userName='+ userName )
     let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*' 
       });
    let options = { headers: headers };

     this.http.get<any>('http://dataservice.accuweather.com/currentconditions/v1/' + 'locationKey=' + city,options)
     .subscribe(data => {
       //this.students = data;
       //console.log('server response data :' + JSON.stringify(data));  
      
      }); 
      //const STUDENTS = [{userName:'Tsahi',positionName:'מפתח',id:'029506774',createDate:'28/07/2020',active:'true',email:'sakyk1@gmail.com',phone:'0523610026'},
      //{userName:'Lior',positionName:'מפתח',id:'888888888',createDate:'29/07/2020',active:'true',email:'liorp@gmail.com',phone:'0524619926'}
     //];

      return null;////STUDENTS ;//this.students;
   }




  //  public save(request: Student): any {
   
  //   var response;
  //   let headers = new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*' 
  //      });
  //   let options = { headers: headers };

  //   this.http.post('http://localhost:52555/api/Values/Save',request,options)
  //   .subscribe(data => {
  //    response = data;
  //    console.log('server response data :' + JSON.stringify(data));  
  //    }); 
  //    //const STUDENTS = [{userName:'Tsahi',positionName:'מפתח',id:'029506774',createDate:'28/07/2020',active:'true',email:'sakyk1@gmail.com',phone:'0523610026'},
  //    //{userName:'Lior',positionName:'מפתח',id:'888888888',createDate:'29/07/2020',active:'true',email:'liorp@gmail.com',phone:'0524619926'}
  //   //];

  //    return response ;
  // }


}
