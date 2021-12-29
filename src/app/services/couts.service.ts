import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Cout } from '../models/cout';
import { map, tap, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoutsService {

  private path = '/Coûts/';
  private coutStore: AngularFirestore;
  private coutCollection: AngularFirestoreCollection<Cout>;

  constructor(private db: AngularFirestore) {
    this.coutStore = db;
    this.coutCollection = this.coutStore.collection(this.path);
  }

  doc2Cout(doc: any): Cout {
    return new Cout(
      doc.useCharge,
      doc.usePerc,
      doc.coutProdPerc,
      doc.coutProdFixe,
      doc.tauxPers,
      doc.tauxForf
    );
  }



  update(cout:Cout){
    this.coutCollection.doc("0").update(Object.assign({}, cout));
}


  getCouts(): Observable<Cout> {
    var couts = this.db.doc<Cout>(this.path + "0");
    return couts
      .valueChanges()
      .pipe(map((doc) => this.doc2Cout(doc)));
  }


}
