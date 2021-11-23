import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Ingredients } from '../models/ingredients';
import { map, tap, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private path = '/Ingredient/'
  private ingredientStore : AngularFirestore;
  private ingredientCollection : AngularFirestoreCollection<Ingredients>

  constructor(private db : AngularFirestore) {
    this.ingredientStore = db;
    this.ingredientCollection = this.ingredientStore.collection(this.path);
  }

  doc2Ingredient(doc : any) : Ingredients{
    console.log(doc)
    return new Ingredients(doc.CODE, doc.LIBELLE, doc.CATEGORIE, doc.PRIX_UNITAIRE, doc.UNITE);
  }

  getAllIngredients(): Observable<Ingredients[]> {
    //this.ingredientCollection.valueChanges({idField : "id"}).pipe(map( data => data.map( (doc) => this.doc2Ingredient(doc)))).subscribe((state: any) => console.log(state));

    //return null;
    return this.ingredientCollection.valueChanges({ idField: "id" }).pipe(map(data => data.map(doc => this.doc2Ingredient(doc))));
  }

}
