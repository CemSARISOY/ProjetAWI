import { Component } from '@angular/core';
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
    this.ingredientService.getAllIngredients().subscribe(ingredient => console.log(ingredient));
  }
}
