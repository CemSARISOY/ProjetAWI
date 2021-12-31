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

  displayedColumns : string[] = ["intitule","categorie","ingredients"]
  dataSource : MatTableDataSource<any>;

  constructor(private ficheTechniqueService : FicheTechniqueService, private router : Router) { }

  ngOnInit(): void {
    this.fichesTechniques = this.ficheTechniqueService.getAllFicheTechniques();
    this.fichesTechniques.subscribe(ft => {
      let test = [];
      for(let i = 0; i < ft.length ; i++ ){
        test.push ({...ft[i], ingredients: [...new Set(this.getListeIngredients(ft[i].progression))]})
      }
      this.dataSource = new MatTableDataSource(test);
    })

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getListeIngredients(progression : any[]){
    let liste = [];
    for(let i = 0; i < progression.length ; i ++){
      if(progression[i].progression) liste.push(this.getListeIngredients(progression[i].progression))
      else{
        for(let j = 0; j < progression[i].ingredients.length ; j++){
          liste.push(progression[i].ingredients[j].ingredient.LIBELLE);
        }
      }
    }
    return liste;
  }

  navigate(ficheTechnique : FicheTechnique){
    this.router.navigate(["/fiches-techniques/"+ficheTechnique.id])
  }

}
