import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheTechnique } from 'src/app/models/fiche-technique';
import { FicheTechniqueService } from 'src/app/services/fiche-technique.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fiche-technique-list',
  templateUrl: './fiche-technique-list.component.html',
  styleUrls: ['./fiche-technique-list.component.css']
})
export class FicheTechniqueListComponent implements OnInit {

  public fichesTechniques : Observable<FicheTechnique[]>

  displayedColumns : string[] = ["intitule","responsable","categorie","nbCouvert"]
  dataSource : MatTableDataSource<FicheTechnique>;

  constructor(private ficheTechniqueService : FicheTechniqueService, private router : Router) { }

  ngOnInit(): void {
    this.fichesTechniques = this.ficheTechniqueService.getAllFicheTechniques();
    this.fichesTechniques.subscribe(ft => {
      this.dataSource = new MatTableDataSource(ft);
    })

  }

  navigate(ficheTechnique : FicheTechnique){
    this.router.navigate(["/fiches-techniques/"+ficheTechnique.id])
  }

}
