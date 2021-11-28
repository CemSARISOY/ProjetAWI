import { Component, Input, OnInit, OnChanges, Output,EventEmitter} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { IngredientsItem } from '../ingredients/ingredients-datasource';
import { Ingredients } from 'src/app/models/ingredients';
import { compileDeclarePipeFromMetadata } from '@angular/compiler';


@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit,OnChanges {

  ingredientForm;
  enableSubmit = true; 
  buttonName : string;
  @Input() ingredient : IngredientsItem
  @Input() modeAdd : boolean
  @Output('update') ingredientUpdated  = new EventEmitter<IngredientsItem>();
  

  constructor(public fb :FormBuilder) {
    this.ingredientForm = this.fb.group({
      CODE : ['',[Validators.required,Validators.pattern("^[0-9]+$")]],
      LIBELLE : ['',[Validators.required]],
      PRIX_UNITAIRE:  ['',[Validators.required,Validators.pattern("^[0-9]+(\.[0-9])*$")]],
      UNITE : ['',[Validators.required]],
      CATEGORIE :  ['',[Validators.required]],
    })

    this.ingredientForm.get('CODE').disable();
    this.ingredientForm.get('LIBELLE').disable();
    this.ingredientForm.get('PRIX_UNITAIRE').disable();
    this.ingredientForm.get('UNITE').disable();
    this.ingredientForm.get('CATEGORIE').disable();
   }


  ngOnChanges(changes: SimpleChanges): void {
      this.ingredientForm.get('CODE').setValue(changes.ingredient.currentValue.CODE)
      this.ingredientForm.get('LIBELLE').setValue(changes.ingredient.currentValue.LIBELLE)
      this.ingredientForm.get('PRIX_UNITAIRE').setValue(changes.ingredient.currentValue.PRIX_UNITAIRE)
      this.ingredientForm.get('UNITE').setValue(changes.ingredient.currentValue.UNITE)
      this.ingredientForm.get('CATEGORIE').setValue(changes.ingredient.currentValue.CATEGORIE)
     
  }

  clearForm(){
      this.ingredientForm.get('CODE').setValue('')
      this.ingredientForm.get('LIBELLE').setValue('')
      this.ingredientForm.get('PRIX_UNITAIRE').setValue('')
      this.ingredientForm.get('UNITE').setValue('')
      this.ingredientForm.get('CATEGORIE').setValue('')
  }

  ngOnInit(): void {
    if (this.modeAdd){
      this.buttonName = "Add"
      this.toggleEdit()
    }
    else {
      this.buttonName = "Submit"
    }
  }

  toggleEdit(): void {
    this.enableSubmit = false;
    this.ingredientForm.get('CODE').enable()
    this.ingredientForm.get('LIBELLE').enable()
    this.ingredientForm.get('PRIX_UNITAIRE').enable()
    this.ingredientForm.get('UNITE').enable()
    this.ingredientForm.get('CATEGORIE').enable()
   }

   
  dialEdit(): void {
    this.enableSubmit = true;
    this.ingredientForm.get('CODE').disable();
    this.ingredientForm.get('LIBELLE').disable();
    this.ingredientForm.get('PRIX_UNITAIRE').disable();
    this.ingredientForm.get('UNITE').disable();
    this.ingredientForm.get('CATEGORIE').disable();
   }

  onSubmit() {
    var ing : IngredientsItem = {
      id : this.modeAdd?"toCreateWhenAddToDatabase":this.ingredient.id,
      CODE : this.ingredientForm.value.CODE,
      LIBELLE :this.ingredientForm.value.LIBELLE,
      PRIX_UNITAIRE:this.ingredientForm.value.PRIX_UNITAIRE,
      UNITE:this.ingredientForm.value.UNITE,
      CATEGORIE:this.ingredientForm.value.CATEGORIE

    };
    this.ingredientUpdated.emit(ing)
    if (this.modeAdd){
      this.clearForm()
    }
    else {
      this.dialEdit()
    }
   
  }



}
