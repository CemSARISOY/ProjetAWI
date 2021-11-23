import { Ingredients } from "./ingredients";

export class MatierePremiere {
    public ingredient : Ingredients;
    public qte : number;
    
    public constructor(ingredient : Ingredients, qte : number){
        this.ingredient = ingredient;
        this.qte = qte;
    }
}
