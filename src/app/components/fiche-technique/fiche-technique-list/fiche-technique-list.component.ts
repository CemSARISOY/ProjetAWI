import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheTechnique } from 'src/app/models/fiche-technique';
import { FicheTechniqueService } from 'src/app/services/fiche-technique.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-fiche-technique-list',
  templateUrl: './fiche-technique-list.component.html',
  styleUrls: ['./fiche-technique-list.component.css']
})
export class FicheTechniqueListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public fichesTechniques$ : Observable<FicheTechnique[]>
  selectControl = new FormControl();
  displayedColumns : string[] = ["intitule","responsable","nbCouverts","categorie"]
  dataSource : MatTableDataSource<any>;
  ingredientsListe : string[] = [];
  filterVal : string = "";
  categorie = new FormControl();
  constructor(private ficheTechniqueService : FicheTechniqueService, private router : Router) { }

  ngOnInit(): void {
    this.fichesTechniques$ = this.ficheTechniqueService.getAllFicheTechniques();
    this.fichesTechniques$.subscribe(ft => {
      let test = [];
      for(let i = 0; i < ft.length ; i++ ){
        this.ingredientsListe.push(...new Set(this.getListeIngredients(ft[i].progression)));
        this.ingredientsListe = [...new Set(this.ingredientsListe)];
        let temp = {...ft[i], ingredients: [...new Set(this.getListeIngredients(ft[i].progression))]};
        delete temp.progression;
        test.push (temp)
  
      }
      this.categorie.setValue("aucun");

      this.categorie.valueChanges.subscribe( () => {
        this.filterSelect();
      })
      
      this.dataSource = new MatTableDataSource(test);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data, filter) => {
        
        if(this.categorie.value != "aucun"){
          if(data.categorie != this.categorie.value) return false;
        }

        if(this.selectControl.value !== null){
          let include = true;
          this.selectControl.value.forEach(element => {
            if(!data.ingredients.includes(element)) include = false;
          });
          if(!include) return false;
        }
        
                
        const dataStr = Object.keys(data).reduce((currentTerm, key) => {
            if(key == "intitule" || key == "responsable"){
              return currentTerm + data[key];
            }else{
              return currentTerm;
            }
        }, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();            
        return dataStr.indexOf(transformedFilter) != -1;
      };
      
    })


  }

  filterSelect(){
    setTimeout( () => {
      this.dataSource.filter = this.filterVal + " "

    }, 50)
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue + " ";
    
  }

  getListeIngredients(progression : any[]){
    let liste = [];
    for(let i = 0; i < progression.length ; i ++){
      if(progression[i].progression)
      {
        let temp = this.getListeIngredients(progression[i].progression)
        temp.forEach( data => {
          liste.push(data);
        })
      }
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
