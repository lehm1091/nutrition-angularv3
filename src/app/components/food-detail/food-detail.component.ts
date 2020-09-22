import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../service/food.service';
import { Food } from '../../models/food.model';

import { LocalStorageService } from '../../service/local-storage.service';
import { faChartBar, faCheck, faPenSquare, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit, OnChanges {
  currentFood: Food;
  faCheck = faCheck;
  faPenSquare = faPenSquare;
  faChartBar = faChartBar;
  faSave = faSave;
  faTrash = faTrash;

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

  private navigateToList() {

    this.router.navigate(['']);


  }


  deleteCurrentFoodDialog(): void {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCurrentFood();
        this.navigateToList();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )


      }
    });


  }


  deleteCurrentFood() {
    this.foodService.deleteOneById(this.currentFood.id).subscribe(
      error => {
        if (error) { console.log(error); }

      }

    )

  }




}

