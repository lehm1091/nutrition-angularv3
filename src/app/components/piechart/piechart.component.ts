import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  @Input()
  currentFood: Food;

  fats = 0;
  carbs = 0;
  protein = 0;

  ngOnInit(): void {

    this.fats = this.percentageOfFats();
    this.protein = this.percentageOfProtein();
    this.carbs = this.percentageOfCarbs()
    console.log(this.currentFood.id);


    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.fats = Math.floor(this.percentageOfFats());
    this.carbs = Math.floor(this.percentageOfCarbs());
    Math.floor(this.percentageOfProtein());
    this.pieChartData = [this.carbs, this.fats, this.protein];
    this.pieChartLabels = [[`Carbs ${this.carbs}%`], [`Fat ${this.fats}%`], `Protein ${this.protein}%`];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }





  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = []
  public pieChartType: ChartType;
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgb(75, 184, 154)', 'rgb(188, 95, 84)', 'rgb(228, 177, 1)'],
    },
  ];

  constructor() {

  }


  percentageOfFats(): number {
    const fat = this.currentFood.totalFat * 9;
    const carb = (this.currentFood.carbohydrate) * 4 + this.currentFood.fibre * 2;
    const protein = this.currentFood.protein * 4;
    return Math.floor(100 * (fat / (fat + protein + carb)));
  }
  percentageOfCarbs(): number {
    const fat = this.currentFood.totalFat * 9;
    const carb = (this.currentFood.carbohydrate) * 4 + this.currentFood.fibre * 2;
    const protein = this.currentFood.protein * 4
    return Math.floor(100 * (carb / (fat + protein + carb)));
  }

  percentageOfProtein(): number {
    const fat = this.currentFood.totalFat * 9;
    const carb = (this.currentFood.carbohydrate) * 4 + this.currentFood.fibre * 2;
    const protein = this.currentFood.protein * 4
    return Math.floor(100 * (protein / (fat + protein + carb)));
  }


}
