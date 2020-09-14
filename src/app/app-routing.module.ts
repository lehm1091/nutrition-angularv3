import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { AutocompleteFoodComponent } from './components/autocomplete-food/autocomplete-food.component';
import { FoodComparsionComponent } from './components/food-comparsion/food-comparsion.component';


const routes: Routes = [

  { path: '', redirectTo: 'list-food', pathMatch: 'full' },
  { path: 'add-food', component: AddFoodComponent },
  { path: 'list-food', component: FoodListComponent },
  { path: 'foods/:id', component: FoodDetailComponent },
  { path: 'foods/category/:category', component: FoodListComponent },
  { path: 'foods/compare/:ids', component: FoodComparsionComponent },
  { path: 'test', component: AutocompleteFoodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
