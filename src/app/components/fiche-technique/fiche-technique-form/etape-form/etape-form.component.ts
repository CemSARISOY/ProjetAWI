import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Ingredients } from 'src/app/models/ingredients';
import { map } from 'rxjs/operators';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-etape-form',
  templateUrl: './etape-form.component.html',
  styleUrls: ['./etape-form.component.css']
})
export class EtapeFormComponent implements OnInit {

  @Input() values : any;
  @Output() newStepValues = new EventEmitter<any>();
  @Output() modifiedStepValues = new EventEmitter<any>();

  isModifying : boolean = false;

  // Adding step attributes
  titre : string;
  temps : number = 0;
  description : string;

  newIngredient : string;
  quantite : number = 0;
  ingredientsEtape : any[] = [];


  myControl = new FormControl();
  ingredients : Observable<Ingredients[]>;
  filteredOptions : Observable<Ingredients[]>;

  constructor(private ingredientsService : IngredientsService) { }

  ngOnInit(): void {
    if(this.values !== undefined){
      this.isModifying = true;
      this.titre = this.values.titreEtape;
      this.temps = this.values.temps;
      this.description = this.values.description;
      this.ingredientsEtape = this.values.ingredients
      
    }
    
    
    this.ingredients = this.ingredientsService.getAllIngredients();
    this.filteredOptions = this.ingredients;
    this.myControl.valueChanges.subscribe(value =>
      this.filter(value)
    );
  
  }

  public async addIngredient(){
    let found = false;
    const ingrExists = new Promise( (resolve, reject) => {
      this.ingredients.forEach(data => {
        data.forEach((ingredient : Ingredients) => {
          if(ingredient.LIBELLE == this.newIngredient && this.quantite !== null)
          {
            found = true
            this.ingredientsEtape.push({ingredient:JSON.parse(JSON.stringify(ingredient)),quantite:this.quantite})
            this.newIngredient = "";
            resolve(found);
          } 
        });
        resolve(found);
      });
    }) 

  }

  private filter(value: string): void{
    if(value !== undefined){
      const filterValue = value.toLowerCase();
      this.filteredOptions = this.ingredients.pipe(map (element => element.filter(data => data.LIBELLE.toLowerCase().includes(filterValue))));
    }
    
  }

  public addStep(){

    if(this.isModifying){
      this.modifiedStepValues.emit({
        titreEtape: this.titre,
        temps: this.temps,
        description: this.description,
        ingredients: this.ingredientsEtape
      })
    }
    else{
      this.newStepValues.emit({
        titreEtape: this.titre,
        temps: this.temps,
        description: this.description,
        ingredients: this.ingredientsEtape
      });
    }
    
    
  }
}
