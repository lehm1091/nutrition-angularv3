import { servicesVersion } from 'typescript';

export class Food {
    id: number;
    name: string;
    servingSize: number;
    protein: number;
    calories: number;
    cholesterol: number;
    carbohydrate: number;
    sugar: number;
    addedSugar: number;
    fiber: number;
    vitaminA: number;
    vitaminD: number;
    vitaminC: number;
    calcium: number;
    iron: number;
    potassium: number;
    sodium: number;
    fat: number;
    saturatedFat: number;
    transFat: number;
    monounsaturatedFat: number;
    polyunsaturatedFat: number;


    static toRawFormValue<T extends RawFoodFormValue>(serverData: T): RawFoodFormValue {
        return {
            id: serverData.id,
            name: serverData.name,
            servingSize: serverData.servingSize,
            protein: serverData.protein,
            calories: serverData.calories,
            cholesterol: serverData.cholesterol,
            carbohydrate: serverData.carbohydrate,
            sugar: serverData.sugar,
            addedSugar: serverData.addedSugar,
            fiber: serverData.fiber,
            vitaminA: serverData.vitaminA,
            vitaminD: serverData.vitaminD,
            vitaminC: serverData.vitaminC,
            calcium: serverData.calcium,
            iron: serverData.iron,
            potassium: serverData.potassium,
            sodium: serverData.sodium,
            fat: serverData.fat,
            saturatedFat: serverData.saturatedFat,
            transFat: serverData.transFat,
            monounsaturatedFat: serverData.monounsaturatedFat,
            polyunsaturatedFat: serverData.polyunsaturatedFat,
        };
    }

    static percentageOfFats(food: Food): number {
        const fat = food.fat * 9;
        const carb = (food.carbohydrate) * 4;
        const protein = food.protein * 4;
        const fiber = food.fiber * 2;
        const total = fat + carb + fiber + protein;
        const percentage = (fat / total) * 100;

        return this.round(percentage);
    }
    static percentageOfCarbs(food: Food): number {
        const fat = food.fat * 9;
        const carb = (food.carbohydrate) * 4;
        const protein = food.protein * 4;
        const fiber = food.fiber * 2;
        const total = fat + carb + fiber + protein;
        const percentage = (carb / total) * 100;

        return this.round(percentage);
    }

    static percentageOfProtein(food: Food): number {
        const fat = food.fat * 9;
        const carb = (food.carbohydrate) * 4;
        const protein = food.protein * 4;
        const fiber = food.fiber * 2;
        const total = fat + carb + fiber + protein;
        const percentage = (protein / total) * 100;

        return this.round(percentage);
    }

    static percentageOfFiber(food: Food): number {
        const fat = food.fat * 9;
        const carb = (food.carbohydrate) * 4;
        const protein = food.protein * 4;
        const fiber = food.fiber * 2;
        const total = fat + carb + fiber + protein;
        const percentage = (fiber / total) * 100;

        return this.round(percentage);
    }

    static getCaloriesFromFat(food: Food): number {
        return food.fat * 9;
    }

    private static round(num): number {
        return Math.round((num + Number.EPSILON) * 10) / 10;
    }





    /*
        constructor() {
    
            this.id = 0;
            this.name = "";
            this.protein = 0;
            this.calories = 0;
            this.cholesterol = 0;
            this.carbohydrate = 0;
            this.sugar = 0;
            this.addedSugar = 0;
            this.fiber = 0;
            this.vitaminA = 0;
            this.vitaminC = 0;
            this.vitaminD = 0;
            this.calcium = 0;
            this.iron = 0;
            this.potassium = 0;
            this.sodium = 0;
            this.fat = 0;
            this.saturatedFat = 0;
            this.transFat = 0;
            this.monounsaturatedFat = 0;
            this.polyunsaturatedFat = 0;
            this.categoriesIds = [];
    
    
    
        }
    
        */

    constructor(formValue: RawFoodFormValue) {

        console.log(formValue);
        this.name = formValue.name;
        this.servingSize = formValue.servingSize;
        this.protein = formValue.protein;
        this.calories = formValue.calories;
        this.cholesterol = formValue.cholesterol;
        this.carbohydrate = formValue.carbohydrate;
        this.sugar = formValue.sugar;
        this.addedSugar = formValue.addedSugar;
        this.fiber = formValue.fiber;
        this.vitaminA = formValue.vitaminA;
        this.vitaminC = formValue.vitaminC;
        this.vitaminD = formValue.vitaminD;
        this.calcium = formValue.calcium;
        this.iron = formValue.iron;
        this.potassium = formValue.potassium;
        this.sodium = formValue.sodium;
        this.fat = formValue.fat;
        this.saturatedFat = formValue.saturatedFat;
        this.transFat = formValue.transFat;
        this.monounsaturatedFat = formValue.monounsaturatedFat;
        this.polyunsaturatedFat = formValue.polyunsaturatedFat;




    }



}


export interface RawFoodFormValue {
    id: number;
    name: string;
    servingSize: number;
    protein: number;
    calories: number;
    cholesterol: number;
    carbohydrate: number;
    sugar: number;
    addedSugar: number;
    fiber: number;
    vitaminA: number;
    vitaminD: number;
    vitaminC: number;
    calcium: number;
    iron: number;
    potassium: number;
    sodium: number;
    fat: number;
    saturatedFat: number;
    transFat: number;
    monounsaturatedFat: number;
    polyunsaturatedFat: number;

}