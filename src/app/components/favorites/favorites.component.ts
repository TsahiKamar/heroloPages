
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTable } from '@angular/material';
import { Favorite } from './favorite.model';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {FavoriteRemove} from '../favorites/favorite.actions';
import { FavSel } from '../WeatherDetails/Models/favSel.model';
 

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
@Input('currentCity') selectedCity:string;
//@Input('key') ID:string;
//@Input('temperature') temperature1:number;

@Output() childToParent = new EventEmitter<FavSel>(); //<String>();


favSelectedID:number;
favSelectedCityName:string;
favSelectedTemperature:number;

  
favorites: Observable<Favorite[]>;
displayedColumns: string[] = ['num','ID','name','currentWeather'];
dataSource: Observable<Favorite[]>;
@ViewChild(MatTable,{static:true}) table: MatTable<any>;
 

constructor(private router: Router,private route: ActivatedRoute,private store: Store<{ favorites: Favorite[] }>) { 
  this.favorites = store.pipe(select('favorites')); 
}

 

 ngOnInit() {
    this.dataSource = this.favorites; 
}


  onRowClicked(row:any){
    console.log('row selected ..');
    console.log('table selected row City :' + row.name);
    //this.favSelectedCityName = row.name;
    //this.favSelectedID = row.ID;
    //this.favSelectedTemperature = row.currentWeather;

    let favSel = new FavSel();
    favSel.key = row.ID;
    favSel.city = row.name;
    console.log('Child favSel :' + JSON.stringify(favSel));
    
    this.childToParent.emit(favSel);//row.ID);

    this.router.navigate(['/weatherDetails']);
  }

  removeFavorite(favoriteIndex) {
    console.log('index to delete :' + favoriteIndex);

    this.store.dispatch(new FavoriteRemove(favoriteIndex));

  }  

}
