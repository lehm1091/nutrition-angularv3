import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../service/food.service';
import { Food } from '../../models/food.model';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-autocomplete-food',
  templateUrl: './autocomplete-food.component.html',
  styleUrls: ['./autocomplete-food.component.css']
})
export class AutocompleteFoodComponent implements OnInit {

  searchValue = '';
  foodList: Food[];
  faSearch = faSearch;

  public placeholder: string = 'Find Nutritional Value of a Product';
  public keyword = 'name';
  public historyHeading: string = 'Recently selected';



  constructor(private foodService: FoodService) { }

  ngOnInit(): void {

    this.getFoodList();

  }


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
