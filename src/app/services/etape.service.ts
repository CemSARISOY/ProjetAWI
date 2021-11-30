import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Etape } from '../models/etape';

@Injectable({
  providedIn: 'root'
})
export class EtapeService {
  private path = '/Etape/';
  private etapeStore: AngularFirestore;
  private etapeCollection: AngularFirestoreCollection<Etape>;

  constructor(private db: AngularFirestore) {
    this.etapeStore = db;
    this.etapeCollection = this.etapeStore.collection(this.path);
  }

  doc2Etape(doc) : Etape{
    let mps : any[] = [];
    for(let i = 0 ; i < doc.mp.length ; i ++){
      mps.push({CODE: doc.mp[i].CODE,
                LIBELLE : doc.mp[i].LIBELLE,
                CATEGORIE : doc.mp[i].CATEGORIE,
                PRIX_UNITAIRE : doc.mp[i].PRIX_UNITAIRE,
                UNITE : doc.mp[i].UNITE,
                quantite : doc.mp[i].quantite})
    }
    return new Etape(doc.titre, doc.titreMp, doc.description, doc.duree, mps);
  }

  getAllEtapes() : Observable<Etape[]>{
    return this.etapeCollection.valueChanges({ idField: 'id' })
    .pipe(map( data => data.map( doc => this.doc2Etape(doc))));
  }


  addEtape(etape : Etape) : void{
    const id = this.etapeStore.createId();
    this.etapeCollection.doc(id).get().subscribe(doc => {
      if(!doc.exists){
        this.etapeCollection.doc(id).set(Object.assign({}, etape));
      }
    });

  }


}
