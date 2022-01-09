import { Component, Input, OnInit, OnChanges, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { IngredientsItem } from '../ingredients/ingredients-datasource';
import { MatChipInputEvent } from '@angular/material/chips';
import Swal from 'sweetalert2';
import { Ingredients } from 'src/app/models/ingredients';



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
    this.ingredientForm.get('STOCK').setValue(value.STOCK)
    this.ingredientForm.get('ALLERGENE').setValue(value.ALLERGENES)
    this.ingredientForm.get('id').setValue(value.id)
 
  }
  @Input() modeAdd : boolean
  @Output('update') ingredientUpdated  = new EventEmitter<IngredientsItem>();
  

  constructor(public fb :FormBuilder) {
    this.ingredientForm = this.fb.group({
      id:[''],
      CODE : ['',[Validators.required,Validators.pattern("^[0-9]+$")]],
      LIBELLE : ['',[Validators.required]],
      PRIX_UNITAIRE:  ['',[Validators.required,Validators.pattern("^[0-9]+(\.[0-9]{0,2})*$")]],
      UNITE : ['',[Validators.required]],
      CATEGORIE :  ['',[Validators.required]],
      STOCK :  ['',[Validators.required]],
     // ALLERGENE : new FormControl([this.allergenes])
     ALLERGENE : new FormControl([''])
    })
    
    this.ingredientForm.get('CODE').disable();
    this.ingredientForm.get('LIBELLE').disable();
    this.ingredientForm.get('PRIX_UNITAIRE').disable();
    this.ingredientForm.get('UNITE').disable();
    this.ingredientForm.get('CATEGORIE').disable();
    this.ingredientForm.get('ALLERGENE').disable()
    this.ingredientForm.get('STOCK').disable()

   }


  ngOnChanges(changes: SimpleChanges): void {
   /* if (changes.allergenes.firstChange){
        this.ingredientForm.get('ALLERGENE').setValue(this.allergenes)
    }*/
  }

  clearForm(){
      this.ingredientForm.get('CODE').setValue('')
      this.ingredientForm.get('LIBELLE').setValue('')
      this.ingredientForm.get('PRIX_UNITAIRE').setValue('')
      this.ingredientForm.get('UNITE').setValue('')
      this.ingredientForm.get('CATEGORIE').setValue('')
      this.ingredientForm.get('STOCK').setValue(0)
    
  }

  ngOnInit(): void {
    if (this.modeAdd){
      this.buttonName = "Ajouter l'ingrédient"
      this.toggleEdit()
    }
    else {
      this.buttonName = "Modifier l'ingrédient"
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
   this.ingredientForm.get('STOCK').enable()
   }

   
  dialEdit(): void {
    this.enableSubmit = true;
    this.ingredientForm.get('CODE').disable();
    this.ingredientForm.get('LIBELLE').disable();
    this.ingredientForm.get('PRIX_UNITAIRE').disable();
    this.ingredientForm.get('UNITE').disable();
    this.ingredientForm.get('CATEGORIE').disable();
    this.ingredientForm.get('ALLERGENE').disable()
    this.ingredientForm.get('STOCK').disable()
   }

  onSubmit() {
    var ingredient : IngredientsItem = {
      id: this.modeAdd ? "toCreateWhenAddToDatabase" : this.ingredientForm.value.id,
      CODE: this.ingredientForm.value.CODE,
      LIBELLE: this.ingredientForm.value.LIBELLE,
      PRIX_UNITAIRE: this.ingredientForm.value.PRIX_UNITAIRE,
      UNITE: this.ingredientForm.value.UNITE,
      CATEGORIE: this.ingredientForm.value.CATEGORIE,
      STOCK: this.ingredientForm.value.STOCK,
      ALLERGENES : this.ingredientForm.value.ALLERGENE

    };
  
    this.ingredientUpdated.emit(ingredient)
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


  editNotification = () => {Swal.fire({
    title: 'Voulez vous editer cet ingrédient ?',
    showDenyButton: true,
    confirmButtonText: 'Oui',
    denyButtonText: `Non`,
  }).then((result) => {
    if (result.isConfirmed) {
      this.toggleEdit()
      //
    } else if (result.isDenied) {
     //
    }
  })
  


}
addNotification = () => {
  if (this.modeAdd){
    var ingredient : IngredientsItem = {
      id: this.modeAdd ? "toCreateWhenAddToDatabase" : this.ingredientForm.value.id,
      CODE: this.ingredientForm.value.CODE,
      LIBELLE: this.ingredientForm.value.LIBELLE,
      PRIX_UNITAIRE: this.ingredientForm.value.PRIX_UNITAIRE,
      UNITE: this.ingredientForm.value.UNITE,
      CATEGORIE: this.ingredientForm.value.CATEGORIE,
      STOCK: this.ingredientForm.value.STOCK,
      ALLERGENES : this.ingredientForm.value.ALLERGNES
    };
    Swal.fire({
      title: 'Voulez vous ajouter cet ingrédient ?',
      text: "Code\n : "+ingredient.CODE+"Libelle : " + ingredient.LIBELLE  + 
      "Prix unitaire : "+ ingredient.PRIX_UNITAIRE+ "Unite : "+ingredient.UNITE +
      "Categorie : "+ ingredient.CATEGORIE +"Allergenes : " + this.ingredientForm.value.ALLERGENE,
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Ingrédient ajouté !', '', 'success')
        this.onSubmit()
      } else if (result.isDenied) {
        Swal.fire('Opération annulée', '', 'info')
      }
    })
  }
  else {
    this.onSubmit()
  }

}

}
