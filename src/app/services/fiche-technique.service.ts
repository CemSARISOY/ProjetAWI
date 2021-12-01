import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FicheTechnique } from '../models/fiche-technique';

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
    let prog : any[] = [];
    for(let i = 0 ; i < doc.progression.length ; i++){
      prog.push(doc.progression[i])
    }
    return new FicheTechnique(doc.intitule,doc.responsable,doc.nbCouvert,prog,doc.categorie);
  }

  getAllFicheTechniques() : Observable<FicheTechnique[]>{
    return this.ficheTechniqueCollection.valueChanges({idField: "id"})
    .pipe(map(data => data.map(doc => this.doc2FicheTechnique(doc))));
  }
}
