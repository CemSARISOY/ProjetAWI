import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FicheTechnique } from 'src/app/models/fiche-technique';
import { FicheTechniqueService } from 'src/app/services/fiche-technique.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fiche-technique-details',
  templateUrl: './fiche-technique-details.component.html',
  styleUrls: ['./fiche-technique-details.component.css']
})
export class FicheTechniqueDetailsComponent implements OnInit {

  queryId : string;
  ficheTechnique$ : Observable<FicheTechnique>;

  constructor(private router : Router, private route : ActivatedRoute, private ficheTechniqueService : FicheTechniqueService) { }

  ngOnInit(): void {
    
    this.queryId = this.route.snapshot.paramMap.get('id');
    this.ficheTechnique$ = this.ficheTechniqueService.getOneFicheTechnique(this.queryId);
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
