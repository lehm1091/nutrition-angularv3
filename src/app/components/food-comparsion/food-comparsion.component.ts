import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from '../add-food/add-food.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-comparsion',
  templateUrl: './food-comparsion.component.html',
  styleUrls: ['./food-comparsion.component.css']
})
export class FoodComparsionComponent implements OnInit {
  foods: Food[];

  constructor(private foodService: FoodService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.foodService.getAllByIds(this.storageService.getList()).subscribe(

    console.log("ids desde url " + this.route.snapshot.paramMap.get('ids'))
    let ids: string[] = this.route.snapshot.paramMap.getAll('ids');


    this.foodService.getAllByIds(ids).subscribe(
      response => {
        this.foods = response;
        console.log("por ids " + response);
      },
      error => {
        console.log(error);
      }
    )


  }



}
