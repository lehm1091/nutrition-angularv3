import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

export interface Categorie {
  id: number;
  name: string;
}

export class Food {
  id: number;
  name: string;
  servingSize: number;
  protein: number;
  calories: number;
  caloriesFromFat: number;
  cholesterol: number;
  carbohydrate: number;
  totalSugar: number;
  addedSugar: number;
  fibre: number;
  vitaminA: number;
  vitaminD: number;
  VitaminC: number;
  calcium: number;
  iron: number;
  potassium: number;
  sodium: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  totalFat: number;
  public Food() {

  }



}


export class FoodHasCategories {
  foodId: number;
  categoryNames: string[];
}



@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {



  id = 0;
  formIsValid = false;
  formIsSumited = false;
  food: Food = new Food();
  categorieformGroup: FormGroup;
  categoriesData: Categorie[];
  private selectedCategories: FormArray;
  constructor(private formBuilder: FormBuilder, private service: FoodService,
    private categoriesService: CategoriesService,
    private _router: Router) {

    categoriesService.getAll()
      .subscribe(data => {
        this.categoriesData = data;

      });

  }

  ngOnInit(): void {
    this.categorieformGroup = this.formBuilder.group({
      name: this.formBuilder.array([])
    });
  }


  onChange(name: string, isChecked: boolean) {
    this.selectedCategories = (this.categorieformGroup.controls.name as FormArray);

    if (isChecked) {
      this.selectedCategories.push(new FormControl(name));
    } else {
      const index = this.selectedCategories.controls.findIndex(x => x.value === name);
      this.selectedCategories.removeAt(index);
    }

    if (this.selectedCategories.value.length > 0) {
      this.formIsValid = true;
    } else {
      this.formIsValid = false;
    }
  }

  saveFood(): void {

    this.formIsSumited = true;
    if (this.formIsValid) {

      this.service.create(this.food).subscribe(
        response => {
          console.log(response);



          this.service.addCategories({
            foodId: response.id,
            categoryNames: this.categorieformGroup.value.name
          }).subscribe(
            response2 => {
              console.log(response2)

              Swal.fire({
                title: 'OK',
                text: 'Product sucessfully saved!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Done!',
              }).then; ((result) => {
                console.log("value of button confirm " + result.value)
                if (result.value) {

                  console.log("dentro de valido");
                }
              });
              this._router.navigateByUrl('/foods/' + response2.id);
            },
            error2 => {
              console.log(error2);
            }

          );


        },
        error => {
          console.log(error);
        }

      );

    }



  }
}