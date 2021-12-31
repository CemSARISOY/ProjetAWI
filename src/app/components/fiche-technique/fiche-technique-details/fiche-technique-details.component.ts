import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FicheTechnique } from 'src/app/models/fiche-technique';
import { FicheTechniqueService } from 'src/app/services/fiche-technique.service';
import { CoutsService } from 'src/app/services/couts.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Cout } from 'src/app/models/cout';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EtiquetteDialogueComponent } from './etiquette-dialogue/etiquette-dialogue.component';
import { ThrowStmt } from '@angular/compiler';
// PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export interface DialogData {
  numberOfEtiq: string;
}

@Component({
  selector: 'app-fiche-technique-details',
  templateUrl: './fiche-technique-details.component.html',
  styleUrls: ['./fiche-technique-details.component.css']
})


export class FicheTechniqueDetailsComponent implements OnInit {

  queryId : string;
  ficheTechnique$ : Observable<FicheTechnique>;
  couts$ : Observable<Cout>
  coutMatiere : number;
  coutCharge : number;
  coutProduction : number;
  prixVente : number;
  seuilRentabilite : number;
  benefice : number;
  coutActive : boolean = false;

  constructor(private router : Router, private route : ActivatedRoute, private ficheTechniqueService : FicheTechniqueService, private coutsService : CoutsService,public dialog: MatDialog) { }

  

  ngOnInit(): void {
    
    this.queryId = this.route.snapshot.paramMap.get('id');
    this.ficheTechnique$ = this.ficheTechniqueService.getOneFicheTechnique(this.queryId);
    this.couts$ = this.coutsService.getCouts();
    this.ficheTechnique$.pipe(first()).subscribe(data => {
      this.couts$.pipe(first()).subscribe(cout => {
        console.log(cout);
        console.log(data);
        
        this.coutMatiere = this.getCoutMatiere(data.progression);
        if(cout.usePerc) this.coutMatiere = this.coutMatiere + this.coutMatiere * (cout.coutProdPerc / 100);
        else this.coutMatiere = this.coutMatiere + cout.coutProdFixe;


        let tempsNecessaire = this.getTempsNecessaire(data.progression);
        if(cout.useCharge) {
          this.coutCharge = ((Number(cout.tauxForf) + Number(cout.tauxPers)) / 60 ) * tempsNecessaire
          this.coutProduction = this.coutCharge + this.coutMatiere;
          this.prixVente = this.coutProduction * cout.coefCharge
        }else{
          this.coutProduction = this.coutMatiere;
          this.prixVente = this.coutProduction * cout.coefcoefWithoutCharge;
        }

        this.seuilRentabilite = Math.ceil(this.coutProduction / (this.prixVente/1.1) / data.nbCouvert);
        this.benefice = (this.prixVente/1.1) - this.coutProduction;

      });
      
    })
  }

  getTempsNecessaire(progression : any[]) : number{
    let sum : number = 0;
    for(let i = 0; i < progression.length ; i ++){
      if(progression[i].progression) sum+= this.getTempsNecessaire(progression[i].progression)
      else{
        sum+= Number(progression[i].temps);
      }
    }
    return sum;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EtiquetteDialogueComponent, {
      width: '250px',
      data: {number: -1},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result === undefined)){
        console.log('The dialog was closed '+result);
        this.ficheTechnique$.subscribe(ft => {
          console.log(ft.intitule)
          ft.progression.forEach(element => {
            if (!(element.ingredients === undefined)){
              element.ingredients.forEach(ingredientWithQuantity => console.log(ingredientWithQuantity))
                
            }
          })
        })
      }
 
    });
  }

  getCoutMatiere(progression : any[]) : number{
    let sum : number = 0;
    for(let i = 0; i < progression.length ; i ++){
      if(progression[i].progression) sum+= this.getCoutMatiere(progression[i].progression)
      else{
        for(let j = 0; j < progression[i].ingredients.length ; j++){
          sum+= Number(progression[i].ingredients[j].ingredient.PRIX_UNITAIRE) * progression[i].ingredients[j].quantite;
        }
      }
    }
    return sum;
  }

  delete(){
    Swal.fire({
      title: 'Etes vous sur de vouloir supprimer cette fiche technique ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer'
    }).then((result) => {
      if(result.isConfirmed){
        this.ficheTechniqueService.deleteOneFicheTechnique(this.queryId)
        .then(() => {
          this.router.navigate(["/fiches-techniques"]);
        })
        .catch( () => {
          console.log("error");
        });
      }
    })
    
  }
  
  // PDF
public openPDF():void {
  let DATA = document.getElementById('container');
      
  html2canvas(DATA).then(canvas => {
      
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      
      PDF.save('angular-demo.pdf');
  });     
  }

}
