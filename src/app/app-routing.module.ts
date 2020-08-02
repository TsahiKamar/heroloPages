import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WheatherDetailsComponent } from './components/WeatherDetails/wheather-details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


const routes: Routes = [
  { path: '',redirectTo: '/header',pathMatch:'full'},
  { path: 'header',component: HeaderComponent},//,children: [
  // {path: 'weatherDetails',component: WheatherDetailsComponent}
  //]},
  
  { path: 'weatherDetails',component: WheatherDetailsComponent},
  { path: 'favorites',component: FavoritesComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
