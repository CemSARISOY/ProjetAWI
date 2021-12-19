import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Ingredients } from '../models/ingredients';
import { map, tap, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private path = '/Ingredient/';
  private ingredientStore: AngularFirestore;
  private ingredientCollection: AngularFirestoreCollection<Ingredients>;

  constructor(private db: AngularFirestore) {
    this.ingredientStore = db;
    this.ingredientCollection = this.ingredientStore.collection(this.path);
  }

  doc2Ingredient(doc: any): Ingredients {
    return new Ingredients(
      doc.CODE,
      doc.LIBELLE,
      doc.CATEGORIE,
      doc.PRIX_UNITAIRE,
      doc.UNITE,
      doc.STOCK,
      doc.ALLERGENES,
      doc.id
      
    );
  }

  getAllIngredients(): Observable<Ingredients[]> {
    //this.ingredientCollection.valueChanges({idField : "id"}).pipe(map( data => data.map( (doc) => this.doc2Ingredient(doc)))).subscribe((state: any) => console.log(state));

    //return null;
    return this.ingredientCollection
      .valueChanges({ idField: 'id' })
      .pipe(map((data) => data.map((doc) => this.doc2Ingredient(doc))));
  }

  deleteIngredient(ingredient: Ingredients) {
    return this.db.doc('Ingredient/' + ingredient.id).delete();
  }

  updateIngredient(ingredient: Ingredients){
    var id = ingredient.id
    delete ingredient.id
    this.ingredientCollection.doc(id).update(Object.assign({}, ingredient));
    ingredient.id = id

}


  getIngredient(ingredientId: string): Observable<Ingredients> {
    var ingredient = this.db.doc<Ingredients>(this.path + ingredientId);
    return ingredient
      .valueChanges({ idField: 'id' })
      .pipe(map((doc) => this.doc2Ingredient(doc)));
  }

  addIngredient(ingredient: Ingredients) {
    ingredient.id = this.db.createId();
    this.ingredientCollection
      .doc(ingredient.id)
      .get()
      .subscribe((doc) => {
        if (!doc.exists) {
          var id = ingredient.id
          delete ingredient.id
          this.ingredientCollection
            .doc(id)
            .set(Object.assign({}, ingredient));
            ingredient.id = id

        }
      });
  }
}
