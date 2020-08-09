
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
      
}