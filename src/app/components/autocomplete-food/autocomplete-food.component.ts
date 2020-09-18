import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../service/food.service';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-autocomplete-food',
  templateUrl: './autocomplete-food.component.html',
  styleUrls: ['./autocomplete-food.component.css']
})
export class AutocompleteFoodComponent implements OnInit {

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {

    this.getFoodList();

  }

  searchValue = '';
  foodList: Food[];

  public placeholder: string = 'Enter the Product Name';
  public keyword = 'name';
  public historyHeading: string = 'Recently selected';




  getFoodList(): void {
    console.log("keyword is " + this.keyword);
    this.foodService.getAll().subscribe(
      response => {
        this.foodList = response;
      },
      error => {
        console.log(error);
      }
    );
  }


  public getFoodListByName(): void {
    console.log("keyword is" + this.keyword);
    this.foodService.findByName(this.keyword).subscribe(
      response => {
        this.foodList = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }


  submitTemplateForm(value) {
    console.log(value);
  }
}
