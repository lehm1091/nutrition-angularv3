import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../service/food.service';
import { CategoryService } from '../../service/category.service';

import { Food } from '../../models/food.model';
import { Category } from '../../models/category.model';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';





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
  categoriesData: Category[];
  private selectedCategories: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private service: FoodService,
    private categoriesService: CategoryService,
    private _router: Router) {

    categoriesService.getAll()
      .subscribe(data => {
        this.categoriesData = data;

      });

  }

  ngOnInit(): void {
    this.categorieformGroup = this.formBuilder.group({
      values: this.formBuilder.array([])
    });


  }


  onChange(id, isChecked: boolean) {
    this.selectedCategories = (this.categorieformGroup.controls.values as FormArray);

    if (isChecked) {
      this.selectedCategories.push(new FormControl(id));
      console.log("checked "+ id)
    } else {
      const index = this.selectedCategories.controls.findIndex(x => x.value === id);
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

    console.log(this.selectedCategories.value);
    if (this.formIsValid) {

      this.service.create(this.food).subscribe(
        response => {

          this.service.addCategories(response.id, this.selectedCategories.value
          ).subscribe(
            response2 => {
              console.log(response2);
             
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