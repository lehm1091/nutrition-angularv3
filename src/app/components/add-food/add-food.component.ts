import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../service/food.service';
import { CategoryService } from '../../service/category.service';

import { Food, RawFoodFormValue } from '../../models/food.model';
import { Category } from '../../models/category.model';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from 'src/app/_services/alert.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';





@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {

  title = "New Product";
  editing = false;
  id = 0;
  formIsValid = false;
  formIsSumited = false;
  food: Food;
  checkedIDs: number[] = [];
  currentFoodCategories: Category[] = [];
  categories: Category[];
  foodForm: FormGroup = this.initFoodForm();
  faSave = faSave;


  constructor(
    private formBuilder: FormBuilder,
    private service: FoodService,
    private categoriesService: CategoryService,
    private _router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService) {


  }

  ngOnInit(): void {


    if (this.route.snapshot.paramMap.has('id')) {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.editing = true;
      this.title = "Edit Product";
      this.initCurrentFood();
    }
    else {
      this.editing = false;
      this.initCategoriesListOnly();
    }


  }





  initCurrentFood() {
    this.service.getOneById(this.id).subscribe(
      data => {
        this.food = data;

        this.currentFoodCategories = data.categories;
      },
      error => {
        console.log(error);
      },
      () => {
        this.foodForm.patchValue(this.food);
        this.categoriesService.getAll().subscribe(
          data => {
            this.categories = data;
          },
          error => {
            console.log(error);
          },
          () => {

            this.initCategoriesChecks(this.categories);

          }
        );
      }
    );
  }

  initCategoriesListOnly() {
    this.categoriesService.getAll().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
        this.alertService.errorDialog(error);
      },
      () => {

        this.initCategoriesChecks(this.categories);
      }
    );
  }

  initFoodForm(): FormGroup {
    let formGroup: FormGroup;
    formGroup = this.formBuilder.group({});
    formGroup.addControl('categories', this.formBuilder.array([], Validators.required));
    formGroup.addControl('name', this.formBuilder.control('', Validators.required));
    formGroup.addControl('servingSize', this.formBuilder.control(0, [Validators.min(1), Validators.required]));
    formGroup.addControl('calories', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('cholesterol', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('protein', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('carbohydrate', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('sugar', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('addedSugar', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('fiber', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('vitaminA', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('vitaminD', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('vitaminC', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('iron', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('sodium', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('fat', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('saturatedFat', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('transFat', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('monounsaturatedFat', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('polyunsaturatedFat', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('calcium', this.formBuilder.control(0, Validators.min(0)));
    formGroup.addControl('potassium', this.formBuilder.control(0, Validators.min(0)));


    return formGroup;
  }


  initCategoriesChecks(arr) {
    const checkGroup: FormArray = this.foodForm.get('categories') as FormArray;
    arr.map(cat => {
      let checked = false;
      if (this.editing) {
        for (const iterator of this.currentFoodCategories) {
          if (iterator.id === cat.id) {
            checked = true;
            this.checkedIDs.push(cat.id);
          }
        }
      }

      checkGroup.push(this.formBuilder.group(
        {
          id: cat.id,
          name: cat.name,
          checked: checked
        }
      ));

    });

  }




  get checkGroup(): FormArray {
    return this.foodForm.get('categories') as FormArray;

  }

  onChange(id, event) {
    let alreadyInList = false;
    let index = -1;
    for (let i = 0; i < this.checkedIDs.length; i++) {
      if (this.checkedIDs[i] === id) {
        alreadyInList = true;
        index = i;
      }
    }

    if (!alreadyInList && event.checked) {
      this.checkedIDs.push(id);
    }
    if (alreadyInList && !event.checked) {
      this.checkedIDs = this.checkedIDs.filter(value => value !== id);

    }


  }


  onSubmit() {
    if (this.foodForm.invalid) {
      return;
    }

    if (this.editing) {
      this.updateFood();
    }
    else {
      this.saveFood();
    }

  }

  saveFood(): void {

    let id;
    console.log(this.foodForm.value as RawFoodFormValue);
    const _food = new Food(this.foodForm.value as RawFoodFormValue);

    console.log(_food);
    this.service.create(_food).subscribe(
      response => {
        id = response.id;
        this.service.addCategories(response.id, this.checkedIDs
        ).subscribe(
          response2 => {
            console.log(response2);
          },
          error2 => {
            console.log(error2);

          }
        );
      },
      error => {
        console.log(error);
        this.alertService.errorDialog(error);
      },
      () => {

        this.alertService.saveSucess();
        this._router.navigateByUrl('/foods/' + id);
      }

    );


  }

  updateFood(): void {
    this.food = new Food(this.foodForm.value as RawFoodFormValue);
    this.food.id = this.id;
    this.service.update(this.food, this.id).subscribe(
      response => {
        this.service.addCategories(this.id, this.checkedIDs
        ).subscribe(
          response2 => {
            console.log(response2);
          },
          error2 => {
            console.log(error2);

          }
        );
      },
      error => {
        console.log(error);
        this.alertService.errorDialog(error);
      },
      () => {

        this.alertService.updateSucess();
        this._router.navigateByUrl('/foods/' + this.id);
      }

    );


  }



  get form() { return this.foodForm.controls; }

}

