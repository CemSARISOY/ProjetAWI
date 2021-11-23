import { Ingredients } from "./ingredients";

export class Stock {
    public ingredient : Ingredients;
    public nb : number;

    public constructor(ingredient : Ingredients, nb : number){
        this.ingredient = ingredient;
        this.nb = nb;
    }
}
