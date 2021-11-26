import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { FormBuilder } from '@angular/forms';
import { MatOption } from '@angular/material/core';


@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit {

  ingredientForm;


  constructor(public fb :FormBuilder) {
    this.ingredientForm = this.fb.group({
      CODE : [''],
      LIBELLE : [''],
      PRIX_UNITAIRE : [''],
      UNITE : [''],
      CATEGORIE : [''],
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.ingredientForm.value);
  }
}
