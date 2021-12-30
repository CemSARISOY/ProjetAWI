import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FicheTechnique } from 'src/app/models/fiche-technique';
import { FicheTechniqueService } from 'src/app/services/fiche-technique.service';
import { CoutsService } from 'src/app/services/couts.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Cout } from 'src/app/models/cout';

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

  constructor(private router : Router, private route : ActivatedRoute, private ficheTechniqueService : FicheTechniqueService, private coutsService : CoutsService) { }

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
      });
      
    })
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
  

}
