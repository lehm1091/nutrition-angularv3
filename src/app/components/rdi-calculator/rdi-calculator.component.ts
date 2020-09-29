import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rdi-calculator',
  templateUrl: './rdi-calculator.component.html',
  styleUrls: ['./rdi-calculator.component.scss']
})
export class RdiCalculatorComponent implements OnInit {

  calculatorForm: FormGroup;
  submitted = false;
  weigthUnit = 'lbs';
  weightUnitTitle = "switch to kilos";
  heightUnitSecondary = 'in';
  heightUnitPrimary = 'cm';
  isMetric = true;
  heightUnitTitle: string = "switch to imperial";
  bmr = 0;
  rdi = 0;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.calculatorForm = this.formBuilder.group({
      weight: [, Validators.required],
      height: [, Validators.required],
      heightSecondary: [],
      age: [, Validators.required],
      gender: [, Validators.required],
      PAL: [, Validators.required]
    })
  }


  


  swithWeightUnits() {
    if (this.weigthUnit === 'lbs') {

      this.weigthUnit = 'kilos';
      this.weightUnitTitle = "switch to lbs";
    }
    else {

      this.weigthUnit = 'lbs';
      this.weightUnitTitle = "switch to kilos";
    }
  }


  swicthHeightUnits() {
    if (this.heightUnitPrimary === 'cm') {
      this.isMetric = false;
      this.heightUnitPrimary = 'ft';
      this.heightUnitTitle = "switch to metric";
    }
    else {
      this.isMetric = true;
      this.heightUnitPrimary = 'cm';
      this.heightUnitTitle = "switch to imperial";
    }


  }

  calculate() {
    let weight = this.calculatorForm.controls['weight'].value;

    if (this.weigthUnit === 'lbs') {
      weight = weight * 0.453592;
    }
    let height1 = this.calculatorForm.controls['height'].value;
    let height2 = this.calculatorForm.controls['heightSecondary'].value;
    let heightTotal = 0;
    if (!this.isMetric) {
      height1 = height1 * 30.48;
      height2 = height2 * 2.54;
      heightTotal = height1 + height2;

    } else {
      heightTotal = height1;
    }



    if (this.calculatorForm.controls['height'].value === "male") {
      this.bmr = 88.362 + 13.397 * weight + 12.7 * heightTotal - 5.677 * this.calculatorForm.controls['age'].value;

    }
    else {
      this.bmr = 447.593 + weight * 9.247 + heightTotal * 3.098 - 4.330 * this.calculatorForm.controls['age'].value;
    }

    this.rdi = this.bmr * this.calculatorForm.controls['PAL'].value;

    this.rdi = Math.round(this.rdi);
    this.bmr = Math.round(this.bmr);
  }


  onSubmit() {
    this.submitted = true;
    if (this.calculatorForm.invalid) {
      return;
    }
    this.calculate();



  }
  get form() { return this.calculatorForm.controls; }
}
