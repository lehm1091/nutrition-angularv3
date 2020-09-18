import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../service/food.service';
import { Food } from '../../models/food.model';

import { LocalStorageService } from '../../service/local-storage.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit, OnChanges {
  currentFood: Food;
  faCheck = faCheck;

  constructor(

    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService
    

  ) {





  }

  ngOnInit(): void {

    this.getFoodById(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentFood);



  }
  ngOnChanges(): void {


  }

  getFoodById(id): void {
    this.foodService.getOneById(id).subscribe(
      response => {
        this.currentFood = response;
      },
      error => {
        console.log(error);
      }
    );

  }


  addItemToComparsion(id): void {
    this.localStorageService.addId(id);
    const dato = localStorage.getItem('listOfIds');
    this.navigateToComparsion();
  }

  limitReached(): boolean {
    return this.localStorageService.limitReached();
  }

  private navigateToComparsion() {
 
    this.router.navigate(['/compare/']);

  }





}









