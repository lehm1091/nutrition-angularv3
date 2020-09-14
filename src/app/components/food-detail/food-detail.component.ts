import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from '../add-food/add-food.component';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit, OnChanges {
  currentFood: Food = new Food();
  chart: FoodPieChart;



  constructor(

    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router

  ) {

    console.log(this.currentFood)



  }

  ngOnInit(): void {

    this.getFoodById(this.route.snapshot.paramMap.get('id'));



  }
  ngOnChanges(): void {


  }

  getFoodById(id): void {
    this.foodService.findById(id).subscribe(
      response => {
        this.currentFood = response;
        console.log(this.currentFood);
        this.chart = new FoodPieChart(
          Math.floor(this.percentageOfFats()),
          Math.floor(this.percentageOfCarbs()),
          Math.floor(this.percentageOfProtein())
        );

      },
      error => {
        console.log(error);
      }
    );
  }


  percentageOfFats(): number {
    const fat = this.currentFood.totalFat * 9;
    const carb = (this.currentFood.carbohydrate) * 4 + this.currentFood.fibre * 2;
    const protein = this.currentFood.protein * 4
    return 100 * (fat / (fat + protein + carb));
  }
  percentageOfCarbs(): number {
    const fat = this.currentFood.totalFat * 9;
    const carb = (this.currentFood.carbohydrate) * 4 + this.currentFood.fibre * 2;
    const protein = this.currentFood.protein * 4
    return 100 * (carb / (fat + protein + carb));
  }

  percentageOfProtein(): number {
    const fat = this.currentFood.totalFat * 9;
    const carb = (this.currentFood.carbohydrate) * 4 + this.currentFood.fibre * 2;
    const protein = this.currentFood.protein * 4
    return 100 * (protein / (fat + protein + carb));
  }

}



export class FoodPieChart {
  cfood: Food;

  fats;
  carbs;
  protein;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [[`Carbs ${this.carbs}%`], [`Fat ${this.fats}%`], `Protein ${this.protein}%`];
  public pieChartData: SingleDataSet = [33, 33, 34];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(fats, carbs, protein) {
    this.fats = fats;
    this.carbs = carbs;
    this.protein = protein;


    this.pieChartData = [this.carbs, this.fats, this.protein];
    this.pieChartLabels = [[`Carbs ${this.carbs}%`], [`Fat ${this.fats}%`], `Protein ${this.protein}%`];
    console.log(this.pieChartData);
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }




}