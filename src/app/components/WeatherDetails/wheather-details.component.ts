import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatButton } from '@angular/material';


import { Router, ActivatedRoute } from '@angular/router';
import { Combo } from './combo.model';
import { WeatherDetailsService } from './weather-details.service';


@Component({
  selector: 'app-wheather-details',
  templateUrl: './wheather-details.component.html',
  styleUrls: ['./wheather-details.component.css']
})
export class WheatherDetailsComponent implements OnInit {

  //public cityDict = new Dictionary();
  

  //Object=Object;

  
   
  //payments: Payment[] = []; 
  

  //payment: Payment;
  //displayedColumns: string[] = ['num','date', 'amount','type','method','status','idNum','action'];//idNum // 'type' ,'method','status'];


  //dataSource: Payment[];//Orig new  this.payments ;//ORIG ELEMENT_DATA; // Payments array assignment
  //  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  
  citiesList: Combo[];
 
  weatherSearchForm = new FormGroup({
    //num: new  FormControl(''),
    city: new FormControl('',Validators.required)//,
    //amount: new FormControl('',Validators.required),//ORIG ['', Validators.required],
    //type: new FormControl('',Validators.required),
    //method: new FormControl('',Validators.required),
    //status:  new FormControl('',Validators.required),
    //idNum: new FormControl('')//?
  
  });
  


  constructor(private router: Router,private route: ActivatedRoute,private weatherDetailsService: WeatherDetailsService) {
    
  //map.set("PO4", "Draft");
  //map.set("PO5", "Cancelled");
  //map.set("PO6", "Rejected");
  //map.set("PO7", "Saved");
   

    //this.dataSource = this.payments ;//ORIG ELEMENT_DATA; // Payments array assignment
   }

  ngOnInit() {
    this.citiesList = this.weatherDetailsService.GetCities();
  }

  currentWeatherSearch(city:string): any{
    var response = this.weatherDetailsService.currentWeatherSearch('london'); //currentWeatherSearch


  }

}
