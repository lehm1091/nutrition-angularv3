import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from '../../service/food.service';
import { Food } from '../../models/food.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit, OnDestroy {


  foodList: Food[];
  name = '';
  title = '';
  categoriesList: Category[];
  category;
  mySubscription: any;



  constructor(
    private foodService: FoodService,
    private categoriesService: CategoryService, 
    private route: ActivatedRoute, private router: Router,
    private storageService: LocalStorageService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

  }



  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.getFoodList();
    this.getCategoryList();
  }

  getFoodByCategory(name: string) {
    this.router.navigate(['/foods/category/' + name]);
  }

  getFoodList(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    if (this.category) {
      this.title = `List of products from ${this.category} category`;
      this.foodService.getByCategoryName(this.route.snapshot.paramMap.get('category')).subscribe(
        response => {
          this.foodList = response;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.title = "Last 10 Products"


      this.foodService.getTop10().subscribe(
        response => {
          this.foodList = response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getCategoryList(): void {
    this.categoriesService.getAll().subscribe(
      response => {
        this.categoriesList = response;
      },
      error => {
        console.log(error);
      }
    );
  }


  addItemToComparsion(id): void {
    this.storageService.addId(id);
    const dato = localStorage.getItem('listOfIds');
    this.navigateToComparsion();
  }

  limitReached(): boolean {
    return this.storageService.limitReached();
  }

  private navigateToComparsion() {
 
    this.router.navigate(['/compare/']);

  }






}
