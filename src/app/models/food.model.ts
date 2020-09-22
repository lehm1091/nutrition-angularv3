export class Food {


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



    public Food() {

    }








}