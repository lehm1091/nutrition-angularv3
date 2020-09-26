import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';
import { concat } from 'rxjs';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input()
  foods: Food[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        stacked: true,
        display: true,

        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return value + '%';
          },
          max: 100
        }
      }],
      yAxes: [{ stacked: true }]
    },
    plugins: {
      datalabels: {
        color: 'white',
        display: false,
        font: {
          weight: 'bold'
        },

        formatter: ((value: any) => value + ' %')


      },

    },

  };




  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(254, 145, 27)' },
    { backgroundColor: 'rgb(0, 170, 159)' },
    { backgroundColor: 'rgb(136, 100, 148)' },
    { backgroundColor: 'rgb(251, 206, 0)' }

  ];


  public barChartData: ChartDataSets[] = [];

  constructor() { }

  ngOnChanges(): void {


    this.barChartData = [];

    this.barChartLabels = this.foods.map(food => food.name);
    this.barChartData = [

      { data: this.foods.map(food => Food.percentageOfFats(food)), label: 'Fat' },
      { data: this.foods.map(food => Food.percentageOfProtein(food)), label: 'Protein' },
      { data: this.foods.map(food => Food.percentageOfCarbs(food)), label: 'Carbohydrate' },
      { data: this.foods.map(food => Food.percentageOfFiber(food)), label: 'Fiber' }


    ];


    /*

    for (let i = 0, len = this.foods.length; i < len; i++) {

      let data: ChartDataSets =
      {
        data: [this.foods[i].fat,
        this.foods[i].protein,
        this.foods[i].carbohydrate,
        this.foods[i].fiber],
        label:
        
        
        this.foods[i].name
      }
      console.log("data " + data);

      this.barChartData.push(data);

    }*/

  }

  ngOnInit(): void {

    this.barChartLabels = ["", "", "", ""];
    this.barChartData = [{
      data: [1, 2, 3, 4], label: 'Test'
    }]
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
}