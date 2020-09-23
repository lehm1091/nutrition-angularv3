import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { AutocompleteFoodComponent } from './components/autocomplete-food/autocomplete-food.component';
import { FoodComparsionComponent } from './components/food-comparsion/food-comparsion.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import {FoodService} from './service/food.service';
import {CategoryService} from './service/category.service';
import {LocalStorageService} from './service//local-storage.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PiechartComponent } from './components/piechart/piechart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { RdiCalculatorComponent } from './components/rdi-calculator/rdi-calculator.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InternalservererrorComponent } from './internalservererror/internalservererror.component';


@NgModule({
  declarations: [
    AppComponent,
    AddFoodComponent,
    AutocompleteFoodComponent,
    FoodComparsionComponent,
    FoodDetailComponent,
    FoodListComponent,
    PiechartComponent,
    BarChartComponent,
    RdiCalculatorComponent,
    NotfoundComponent,
    InternalservererrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartsModule,
    AutocompleteLibModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [FoodService, CategoryService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
