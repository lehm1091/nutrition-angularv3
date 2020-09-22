import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FoodService } from '../..//service/food.service';
import { Food } from '../../models/food.model';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-food-comparsion',
  templateUrl: './food-comparsion.component.html',
  styleUrls: ['./food-comparsion.component.css']
})
export class FoodComparsionComponent implements OnInit {
  faTimes = faTimes;
  foods: Food[];
  canShowList: boolean;
  ids: string[];

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.canShowList = false;

    //this.foodService.getAllByIds(this.storageService.getList()).subscribe(



    /* if (this.route.snapshot.paramMap.has('ids')) {
       ids = this.route.snapshot.paramMap.getAll('ids');;
     }
     else {
      
     }*/


    this.initItems();


  }


  initItems() {
    this.foods = [];
    this.ids = this.localStorageService.getList();

    if (this.ids.length > 0) {

      this.foodService.getAllByIds(this.ids).subscribe(
        response => {
          this.foods = response;

        },
        error => {
          console.log(error);
        }
      )
      this.canShowList = true;
    } else {
      this.canShowList = false;
    }
  }

  removeAllItems() {
    this.localStorageService.clearList();
    this.canShowList = false;
  }

  removeOneItem(id) {
    this.localStorageService.removeId(id);
    this.initItems();




  }




  public isMax(value: number, variableName: string) {
    const values = this.foods.map(food => food[variableName]);
    const max = Math.max(...values);
    if (value >= max) {
      return true;
    } else {
      return false;
    }
  }




}

