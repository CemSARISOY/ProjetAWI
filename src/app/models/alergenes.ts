import { Ingredients } from "./ingredients";

export class Alergenes {
    public ingredients : Ingredients[];
    public categorie : String;

    public constructor(ingredients : Ingredients[], categorie : String){
        this.ingredients = ingredients;
        this.categorie = categorie;
    }
}
