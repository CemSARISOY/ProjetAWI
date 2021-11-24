import { Component } from '@angular/core';
import { Ingredients } from './models/ingredients';
import { IngredientsService } from './services/ingredients.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private ingredientService : IngredientsService){}

  title = 'ProjetAWI';

  ngOnInit(){
    //this.ingredientService.getAllIngredients().subscribe(ingredient => console.log(ingredient));
    //this.ingredientService.addIngredient(new Ingredients(2000,"kebabs","VIANDES / VOLAILLES",0.50,"P"))

    /* this.ingredientService.getIngredient("kHyZp5XVo0hEwrTrZIQk")
     .subscribe(ingredient => {

      ingredient.LIBELLE = "Tacos";
        this.ingredientService.updateIngredient(ingredient)});*/

      //this.ingredientService.updateIngredient(ingredient)});


  }
}
