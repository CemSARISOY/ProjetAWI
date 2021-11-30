import { Component, Input, OnInit, OnChanges, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { IngredientsItem } from '../ingredients/ingredients-datasource';
import { Ingredients } from 'src/app/models/ingredients';
import { compileDeclarePipeFromMetadata } from '@angular/compiler';
import { MatChipInputEvent } from '@angular/material/chips';



@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit,OnChanges {
  keywords = new Set([' Céréales contenant du Gluten', 'Arachide', 'Crustacé','Céleri','Fruits à coque','Lait','Lupin','Mollusques','Moutarde','Poisson','Soja','Sulfites','Sésame','Oeuf']);
  ;
  ingredientForm;
  enableSubmit = true; 
  buttonName : string;
  @Input()  set ingredient(value: IngredientsItem) {
    this.ingredientForm.get('CODE').setValue(value.CODE)
    this.ingredientForm.get('LIBELLE').setValue(value.LIBELLE)
    this.ingredientForm.get('PRIX_UNITAIRE').setValue(value.PRIX_UNITAIRE)
    this.ingredientForm.get('UNITE').setValue(value.UNITE)
    this.ingredientForm.get('CATEGORIE').setValue(value.CATEGORIE)
 //   console.log("allergenes :"+changes.allergenes.currentValue[0])
    this.ingredientForm.get('ALLERGENE').setValue([''])
  }
  @Input() modeAdd : boolean
  @Input() set allergenes(value : string[]){
    this.ingredientForm.get('ALLERGENE').setValue(value)
  }
  @Output('update') ingredientUpdated  = new EventEmitter<IngredientsItem>();
  

  constructor(public fb :FormBuilder) {
    this.ingredientForm = this.fb.group({
      CODE : ['',[Validators.required,Validators.pattern("^[0-9]+$")]],
      LIBELLE : ['',[Validators.required]],
      PRIX_UNITAIRE:  ['',[Validators.required,Validators.pattern("^[0-9]+(\.[0-9])*$")]],
      UNITE : ['',[Validators.required]],
      CATEGORIE :  ['',[Validators.required]],
     // ALLERGENE : new FormControl([this.allergenes])
     ALLERGENE : new FormControl('')
    })
    
    this.ingredientForm.get('CODE').disable();
    this.ingredientForm.get('LIBELLE').disable();
    this.ingredientForm.get('PRIX_UNITAIRE').disable();
    this.ingredientForm.get('UNITE').disable();
    this.ingredientForm.get('CATEGORIE').disable();
    this.ingredientForm.get('ALLERGENE').disable()

   }


  ngOnChanges(changes: SimpleChanges): void {

     
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
   this.ingredientForm.get('ALLERGENE').enable()
   }

   
  dialEdit(): void {
    this.enableSubmit = true;
    this.ingredientForm.get('CODE').disable();
    this.ingredientForm.get('LIBELLE').disable();
    this.ingredientForm.get('PRIX_UNITAIRE').disable();
    this.ingredientForm.get('UNITE').disable();
    this.ingredientForm.get('CATEGORIE').disable();
 this.ingredientForm.get('ALLERGENE').enable()
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

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywords.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.keywords.delete(keyword);
  }



}
