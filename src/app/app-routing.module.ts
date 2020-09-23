import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { AutocompleteFoodComponent } from './components/autocomplete-food/autocomplete-food.component';
import { FoodComparsionComponent } from './components/food-comparsion/food-comparsion.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { RdiCalculatorComponent } from './components/rdi-calculator/rdi-calculator.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [

  { path: '', redirectTo: 'list-food', pathMatch: 'full' },
  { path: 'add-food', component: AddFoodComponent },
  { path: 'list-food', component: FoodListComponent },
  { path: 'foods/:id', component: FoodDetailComponent },
  { path: 'edit-food/:id', component: AddFoodComponent },
  { path: 'foods/category/:category', component: FoodListComponent },
  { path: 'compare', component: FoodComparsionComponent },
  { path: 'rdi', component: RdiCalculatorComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
