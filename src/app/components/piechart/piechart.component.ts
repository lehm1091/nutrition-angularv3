import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, ChartsModule } from 'ng2-charts';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  @Input()
  currentFood: Food;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
      
    },
    plugins: {
      datalabels: {
        color: 'white',
        display: false,
        font: {
          weight: 'bold'
        },

        formatter: ((value: any) => value + ' %')


      }
    }
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = []
  public pieChartType: ChartType;
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgb(254, 145, 27)', 'rgb(0, 170, 159)', 'rgb(136, 100, 148)', 'rgb(251, 206, 0)']
    },
  ];

  fats = 0;
  carbs = 0;
  protein = 0;
  fiber = 0;

  constructor() {

  }
  ngOnInit(): void {
    this.carbs = Food.percentageOfCarbs(this.currentFood);
    this.fats = Food.percentageOfFats(this.currentFood);
    this.protein = Food.percentageOfProtein(this.currentFood);
    this.fiber = Food.percentageOfFiber(this.currentFood);
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.pieChartData = [this.carbs, this.fats, this.protein, this.fiber];
    this.pieChartLabels = [[`Carbs ${this.carbs}%`], [`Fat ${this.fats}%`], `Protein ${this.protein}%`, `Fiber ${this.fiber}%`];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }












}
