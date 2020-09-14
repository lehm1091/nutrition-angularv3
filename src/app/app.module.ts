import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { AddTestComponent } from './components/add-test/add-test.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { AutocompleteFoodComponent } from './components/autocomplete-food/autocomplete-food.component';
import {StorageService } from './services/storage.service';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FoodService } from './services/food.service';
import { CategoriesService } from './services/categories.service';
import { FoodComparsionComponent } from './components/food-comparsion/food-comparsion.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFoodComponent,
    AddTestComponent,
    FoodListComponent,
    FoodDetailComponent,
    AutocompleteFoodComponent,
    FoodComparsionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    AutocompleteLibModule
  ],
  providers: [FoodService, CategoriesService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
