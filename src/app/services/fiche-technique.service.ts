import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FicheTechnique } from '../models/fiche-technique';
import { Ingredients } from '../models/ingredients';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FicheTechniqueService {

  private path = '/Fiche Technique/';
  private ficheTechniqueStore: AngularFirestore;
  private ficheTechniqueCollection: AngularFirestoreCollection<FicheTechnique>;

  constructor(private db: AngularFirestore) {
    this.ficheTechniqueStore = db;
    this.ficheTechniqueCollection = this.ficheTechniqueStore.collection(this.path);
  }

  doc2FicheTechnique(doc :any) : FicheTechnique{
    if(doc){
      let prog : any[] = [];
      for(let i = 0 ; i < doc.progression.length ; i++){
        prog.push(doc.progression[i])
      }
      return new FicheTechnique(doc.intitule,doc.responsable,doc.nbCouvert,prog,doc.categorie, doc.id);
    }
    return null;
  }
    

  getAllFicheTechniques() : Observable<FicheTechnique[]>{
    return this.ficheTechniqueCollection.valueChanges({idField: "id"})
    .pipe(map(data => data.map(doc => this.doc2FicheTechnique(doc))));
  }

  addFicheTechnique(ficheTechnique : FicheTechnique){
    const id = this.ficheTechniqueStore.createId()
    this.ficheTechniqueCollection.doc(id).get().subscribe(doc => {
      if(!doc.exists){
        this.ficheTechniqueCollection.doc(id).set(Object.assign({}, ficheTechnique));
      }
    })
  }

  updateFicheTechnique(oldFicheTechnique : FicheTechnique, newFicheTechnique : FicheTechnique){
    const id = newFicheTechnique.id;
    oldFicheTechnique.id = id;
    
    const query = this.ficheTechniqueStore.collection(this.path, (ref) => ref.where("progression","array-contains",JSON.parse(JSON.stringify(oldFicheTechnique))))
    query.get().subscribe(data => {
      data.docs.forEach(docSnap => {

        const doc : any = docSnap.data()
        const save = JSON.parse(JSON.stringify(doc));
        
        for(let i = 0 ; i < doc.progression.length ; i++){
          if(doc.progression[i].id === id) doc.progression[i] = JSON.parse(JSON.stringify(newFicheTechnique))
        }
    
        // Recursivité
        this.updateFicheTechnique(new FicheTechnique(save.intitule, save.responsable, save.nbCouvert, save.progression, save.categorie, docSnap.id), new FicheTechnique(doc.intitule, doc.responsable, doc.nbCouvert, doc.progression, doc.categorie, docSnap.id))
        
        
        this.ficheTechniqueCollection.doc(docSnap.id).set({
          categorie: doc.categorie,
          intitule: doc.intitule,
          nbCouvert: doc.nbCouvert,
          responsable: doc.responsable,
          progression: doc.progression,
          id: docSnap.id
        });
      })
      
    });
    this.ficheTechniqueCollection.doc(id).set(Object.assign({}, newFicheTechnique))  
  }

  updateFicheTechniqueByIngredients(ingr : Ingredients){
    const allFts = this.getAllFicheTechniques();
    allFts.pipe(first()).subscribe(arr => {
      console.log(arr);
      for(let i = 0; i < arr.length ; i ++){
        let ft = arr[i];
        this.exploreAndEditProgression(ft.progression, ingr);
        this.ficheTechniqueCollection.doc(ft.id).set(Object.assign({}, ft))
      }
    });
    
  }

  private exploreAndEditProgression(oldProgression : any[], ingredient : Ingredients) : any[]{
    let progression = [...oldProgression];
    for(let i = 0 ; i < progression.length; i++){

      if(progression[i].progression) progression[i].progression = this.exploreAndEditProgression(progression[i].progression, ingredient);
      else{
        for(let j = 0 ; j < progression[i].ingredients.length ; j++){
          if(progression[i].ingredients[j].ingredient.id === ingredient.id){
            progression[i].ingredients[j].ingredient = JSON.parse(JSON.stringify(ingredient));
          }
        }
      }
    }
    
    return progression;
  }


  getOneFicheTechnique(id : string) : Observable<FicheTechnique>{
    return this.ficheTechniqueCollection.doc( id).valueChanges().pipe(map( doc => this.doc2FicheTechnique(doc)))
  }

  deleteOneFicheTechnique(id : string){
    return this.db.doc(this.path + id).delete();
  }

}
