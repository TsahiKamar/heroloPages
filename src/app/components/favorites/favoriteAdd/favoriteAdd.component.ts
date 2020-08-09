
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'; 
import {select, Store} from '@ngrx/store'; 
import {Favorite} from '../favorite.model'; 
import {Observable} from 'rxjs'; 
import {FavoriteAdd} from '../favorite.actions'; 
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/sharedData.service';
import { SharedService } from 'src/app/services/shared.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-favoriteAdd',
  templateUrl: './favoriteAdd.component.html',
  styleUrls: ['./favoriteAdd.component.css']
})
export class FavoriteAddComponent implements OnInit {
 //@Input('currentCity') selectedCity:string;
 //@Input('ID') ID:string;
 
    favorites: Observable<Favorite[]>;  

    key:any;
    name:any;

    existInFavorites: boolean = false;
    btnTitle:string="Add";


    constructor(private router: Router,private route: ActivatedRoute, private store: Store<{ favorites: Favorite[] }>,private shareDataService:SharedDataService,private sharedService:SharedService) { 
      this.favorites = store.pipe(select('favorites')); 
      
       this.favorites.pipe( 
       map(arr =>
          arr.filter( r => r.ID == this.key )
        )
    )
    .subscribe(results => {
      console.log('Search results:', results);
      if (results.length > 0)
      {
        console.log('Exist in favorites !');
        this.existInFavorites = true;
      }
      else
      {
        console.log('Not exist in favorites !');
        this.existInFavorites = false;

      }
    });
    

      //this.key = this.sharedService.getDataValue('ID');
      //this.temperature2 = this.sharedService.getDataValue('currentWeather');
      this.name = this.sharedService.getDataValue('name');


      console.log('shared service data Temperature:' + this.sharedService.getDataValue('currentWeather'));

      console.log('shared service data City:' + this.sharedService.getDataValue('name'));


    } 
     ngOnInit(){
      this.shareDataService.currentMessage.subscribe(message => (this.key= message));
    }

    //not use
    AddFavorite(num:number,ID:string,name:string,currentWeather:string) { 
      const favorite = new Favorite(); 
      favorite.num = this.favorites.pipe.length + 1;//num;
      favorite.name = this.name;//this.selectedCity;//name;
      favorite.ID =this.key;//"215805"; //this.ID;//ID;
      //favorite.currentWeather = this.temperature2;//currentWeather;//this.temperature1;//currentWeather; 
      this.store.dispatch(new FavoriteAdd(favorite)); 
      console.log('AddFavorite ..');
    } 
}




