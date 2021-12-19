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
    //this.ingredientService.getAllIngredients().subscribe(ingredient => console.log("hey"));
    //this.ingredientService.addIngredient(new Ingredients(2000,"kebabs","VIANDES / VOLAILLES",0.50,"P"))

    /* this.ingredientService.getIngredient("SVHoTCzCNoecPlVTu9GU")
     .subscribe(ingredient => {
       console.log(ingredient);
      console.log(ingredient.id)
     ingredient.LIBELLE = "Tacos";
        this.ingredientService.deleteIngredient(ingredient)});*/

      //this.ingredientService.updateIngredient(ingredient)});


  }
}
