import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../service/food.service';
import { CategoryService } from '../../service/category.service';

import { Food } from '../../models/food.model';
import { Category } from '../../models/category.model';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';





export class FoodHasCategories {
  foodId: number;
  categoryNames: string[];
}

export class CheckBoxCategory {
  id: number;
  names: string;
  isChecked: boolean;
}



@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  title = "New Product";
  editing = false;
  id = 0;
  formIsValid = false;
  formIsSumited = false;
  food: Food = new Food();
  checkBoxCategories: CheckBoxCategory[];
  checkedIDs: number[] = []

  constructor(
    private formBuilder: FormBuilder,
    private service: FoodService,
    private categoriesService: CategoryService,
    private _router: Router,
    private route: ActivatedRoute,) {


  }

  ngOnInit(): void {


    if (this.route.snapshot.paramMap.has('id')) {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.editing = true;
      this.title="Edit Product";
      this.service.getOneById(this.id).subscribe(
        data => {

          this.food = data;


        },
        error => {
          console.log(error);
        }

      );




    }
    else {
      this.editing = false;

    }
    this.checkBoxCategories = [];


    this.categoriesService.getAll().subscribe(
      data => {

        data.forEach(item => {
          this.checkBoxCategories.push({
            id: item.id,
            names: item.name,
            isChecked: false
          })
        });
      });



    console.log(this.checkBoxCategories)
  }


  onChange() {
    this.checkedIDs = [];
    this.checkBoxCategories.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });


    console.log(this.checkedIDs);


  }

  saveFood(): void {




    this.service.create(this.food).subscribe(
      response => {

        this.service.addCategories(response.id, this.checkedIDs
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