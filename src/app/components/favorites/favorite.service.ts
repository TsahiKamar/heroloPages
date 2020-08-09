
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favorite } from '../favorites/favorite.model';

@Injectable({
    providedIn: 'root',
  })
  export class FavoriteService {  
    favorites: Favorite[]=[];
 
    constructor(private http: HttpClient) {
    }
  
    //public AddFavorite(favorite: Favorite) {

        //var fav = new Favorite();
        //fav.num = this.favorites.length+1;
        //fav.ID=1;
        //fav.name="Roma";
        //fav.currentWeather="30";
        //this.favorites.push(favorite);
    //}


//   public RemoveFavorite(ID:number){
//         let index = this.favorites.findIndex(x => x.ID === ID);
//         if (index !== -1) {
//             this.favorites.splice(index, 1);
//         }        
//     }

//     public GetFavorites():Favorite[]{
//         return this.favorites;
//     }


}