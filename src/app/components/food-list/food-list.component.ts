import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food, Categorie } from 'src/app/components/add-food/add-food.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit, OnDestroy {

  foodList: Food[];
  name = '';
  title = ''
  categoriesList: Categorie[];
  category;
  mySubscription: any;


  constructor(private foodService: FoodService, private categoriesService: CategoriesService, private route: ActivatedRoute, private router: Router,
    private storageService: StorageService) {

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
    const ids: string[] = this.storageService.getList();
    this.router.navigate(['/foods/compare/' + ids]);

  }






}
