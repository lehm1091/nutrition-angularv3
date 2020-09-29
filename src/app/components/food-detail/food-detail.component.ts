import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../service/food.service';
import { Food } from '../../models/food.model';

import { LocalStorageService } from '../../service/local-storage.service';
import { faChartBar, faCheck, faPenSquare, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/_services/alert.service';



@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit, OnChanges {
  currentFood: Food;
  faCheck = faCheck;
  faPenSquare = faPenSquare;
  faChartBar = faChartBar;
  faSave = faSave;
  faTrash = faTrash;
  loading = true;

  constructor(

    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private alertService: AlertService


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
        this.alertService.errorDialog(error);
      }
      ,
      () => {
        this.loading = false;
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


  deleteCurrentFood() {
    this.alertService.deleteDialog().then(
      flag => {
        if (flag === true) {
          console.log("is true");
          this.foodService.deleteOneById(this.currentFood.id).subscribe(
            response => {
              console.log(response);
              this.alertService.deleteSucess();
              this.navigateToList();

            },
            error => {
              if (error) { console.log(error); }
              this.alertService.errorDialog(error);

            },
            () => {

            }
          );
        }
      }
    );

  }

}






