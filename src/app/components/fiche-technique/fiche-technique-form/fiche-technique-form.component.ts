import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter} from 'rxjs/operators';
import { FicheTechnique } from 'src/app/models/fiche-technique';
import { FicheTechniqueService } from 'src/app/services/fiche-technique.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';
import { Router } from "@angular/router"

@Component({
  selector: 'app-fiche-technique-form',
  templateUrl: './fiche-technique-form.component.html',
  styleUrls: ['./fiche-technique-form.component.css']
})
export class FicheTechniqueFormComponent implements OnInit {

  // Control attributes
  isAddingStep : boolean = false;
  isAddingFt : boolean = false;

  modifyingStep : any;
  modifyingStepIndex : number;
  
  // Form
  nomPlat : string
  nomCuisinier : string
  nbCouverts : number = 1;
  etapes : any[] = [];
  categorie : string;


  // Autocompletion
  myControlFt = new FormControl();
  ficheTechniques : Observable<FicheTechnique[]>;
  filteredOptionsFt : Observable<FicheTechnique[]>;

  constructor(private ficheTechniqueService : FicheTechniqueService, private router: Router) { }

  ngOnInit(): void {
    
    
  }

  private filterFt(value: string): void{
    const filterValue = value.toLowerCase();
    this.filteredOptionsFt = this.ficheTechniques.pipe(map (element => element.filter(data => data.intitule.toLowerCase().includes(filterValue))));
  }

  public addingStep(){
    this.isAddingStep = true;
  }

  public addingFt(){

    if(this.ficheTechniques === undefined){
      this.ficheTechniques = this.ficheTechniqueService.getAllFicheTechniques();
      this.filteredOptionsFt = this.ficheTechniques;
      
      this.myControlFt.valueChanges.subscribe(value =>
        this.filterFt(value)
      );
    }

    this.isAddingFt = true;
  }

  

  public addFt(){
    this.isAddingFt=false;
  }

  public newStep(event){
    this.etapes.push(event);
    this.isAddingStep=false;
  }

  public modifyStep(event){
    this.etapes[this.modifyingStepIndex] = event;
    this.isAddingStep=false;
    this.modifyingStep = undefined;
  }

  


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.etapes, event.previousIndex, event.currentIndex);
  }

  modify(index : number){
    this.modifyingStep = this.etapes[index]
    this.modifyingStepIndex = index;
    this.isAddingStep = true;
  }

  public create(){
    Swal.fire({
      title: 'Etes vous sur d\'avoir bien terminé ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer'
    }).then((result) => {
      if (result.isConfirmed) {
        let f : FicheTechnique = new FicheTechnique(this.nomPlat,this.nomCuisinier, this.nbCouverts,this.etapes,this.categorie);
        this.ficheTechniqueService.addFicheTechnique(f);
        this.router.navigate(["/fiches-techniques"])
      }
    })
  }
}
