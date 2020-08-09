import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WheatherDetailsComponent } from './components/WeatherDetails/wheather-details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


const routes: Routes = [
  { path: '',redirectTo: '/weatherDetails',pathMatch:'full'},
  { path: 'weatherDetails',component: WheatherDetailsComponent}
  ,
  { path: 'header',component: HeaderComponent} , 
  { path: 'favorites',component: FavoritesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
