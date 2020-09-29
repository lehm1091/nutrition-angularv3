import { Component, OnChanges, OnInit, Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { FoodService } from '../..//service/food.service';
import { Food } from '../../models/food.model';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-food-comparsion',
  templateUrl: './food-comparsion.component.html',
  styleUrls: ['./food-comparsion.component.scss']
})
export class FoodComparsionComponent implements OnInit, OnChanges {
  faTimes = faTimes;
  foods: Food[];
  canShowList: boolean;
  ids: string[];

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) { }
  ngOnChanges(): void {



  }

  ngOnInit(): void {
    this.canShowList = true;

    console.log(this.canShowList);










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
    console.log(this.ids);

    if (this.ids.length > 0) {
      this.canShowList = true;

      this.foodService.getAllByIds(this.ids).subscribe(
        response => {
          this.foods = response;
        },
        error => {
          console.log(error);
          this.canShowList = false;
          this.removeAllItems();


        },
        () => {
          console.log("food" + this.foods.toString)
          if (this.foods.length > 0) {
            this.canShowList = true;
            let ids = this.foods.map(food => food.id);
            this.removeAllItems();
            ids.forEach(item => {
              this.localStorageService.addId(item);
            })


          }
          else {
            this.removeAllItems();
            this.canShowList = false;
          }

        }
      );




    } else {
      this.canShowList = false;
    }





  }

  removeAllItems() {
    this.localStorageService.clearList();

  }

  removeOneItem(id) {
    this.localStorageService.removeId(id);
    this.initItems();




  }




  public isMax(value: number, variableName: string) {
    if (value == 0) {
      return false;
    }
    const values = this.foods.map(food => food[variableName]);
    const max = Math.max(...values);
    if (value >= max) {
      return true;
    } else {
      return false;
    }
  }




}

