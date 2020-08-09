import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WheatherDetailsComponent } from './components/WeatherDetails/wheather-details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoriteAddComponent } from './components/favorites/favoriteAdd/favoriteAdd.component';


const routes: Routes = [
  { path: '',redirectTo: '/weatherDetails',pathMatch:'full'},
  { path: 'weatherDetails',component: WheatherDetailsComponent
  // ,
  // children: [ 
  //       { path: '', component: FavoriteAddComponent },
  //       { path: 'favorites', component: FavoritesComponent},
  //       { path: 'favoriteAdd',component: FavoriteAddComponent}      
  // ]
},
  { path: 'header',component: HeaderComponent},
  { path: 'favoriteAdd',component: FavoriteAddComponent},
  //ORIG{ path: 'favorites',component: FavoritesComponent}
  
  
  { path: 'favorites',component: FavoritesComponent,children:[
     { path: '', component: FavoriteAddComponent },
     { path: 'favoriteAdd',component: FavoriteAddComponent}
  ]
}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
