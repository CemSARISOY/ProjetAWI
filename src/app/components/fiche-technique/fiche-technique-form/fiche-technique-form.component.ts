import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter} from 'rxjs/operators';
import { FicheTechnique } from 'src/app/models/fiche-technique';
import { FicheTechniqueService } from 'src/app/services/fiche-technique.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router"
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-fiche-technique-form',
  templateUrl: './fiche-technique-form.component.html',
  styleUrls: ['./fiche-technique-form.component.css']
})
export class FicheTechniqueFormComponent implements OnInit {

  modifyingFt$ : Observable<FicheTechnique>;
  modifyingFt : FicheTechnique;
  id : string;
  isModifying = () => { return this.modifyingFt !== undefined}

  // Control attributes
  isAddingStep : boolean = false;
  isAddingFt : boolean = false;
  newFicheTechnique : string;
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
  ficheTechniques$ : Observable<FicheTechnique[]>;
  filteredOptionsFt : Observable<FicheTechnique[]>;

  constructor(private route : ActivatedRoute, private ficheTechniqueService : FicheTechniqueService, private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.modifyingFt$ = this.ficheTechniqueService.getOneFicheTechnique(this.id);
      this.modifyingFt$.subscribe((data : FicheTechnique) => { 
        this.modifyingFt = data;
        this.categorie = data.categorie;
        this.nomPlat = data.intitule;
        this.nomCuisinier = data.responsable;
        this.nbCouverts = data.nbCouvert;
        this.etapes = data.progression;
      })
    }
    
    
    this.ficheTechniques$ = this.ficheTechniqueService.getAllFicheTechniques();
    
  }

  private filterFt(value: string): void{
    if(value !== undefined){
      const filterValue = value.toLowerCase();
      this.filteredOptionsFt = this.ficheTechniques$.pipe(map (element => element.filter(data => data.intitule.toLowerCase().includes(filterValue))));
    }

  }

  public addingStep(){
    this.isAddingStep = true;
  }

  public addingFt(){

    if(this.filteredOptionsFt === undefined){
      
      this.filteredOptionsFt = this.ficheTechniques$;
      
      this.myControlFt.valueChanges.subscribe(value =>
        this.filterFt(value)
      );
    }

    this.isAddingFt = true;
  }

  

  public addFt(){
    let found = false;

    this.ficheTechniques$.forEach(data => {
      data.forEach((ficheTechnique : FicheTechnique) => {
        if(ficheTechnique.intitule == this.newFicheTechnique)
        {
          found = true
          this.etapes.push({
            intitule:ficheTechnique.intitule,
            categorie:ficheTechnique.categorie,
            nbCouvert: ficheTechnique.nbCouvert,
            responsable: ficheTechnique.responsable,
            progression: ficheTechnique.progression,
            id: ficheTechnique.id
          })
          this.newFicheTechnique = "";
        } 
      });
      this.isAddingFt=!found;
    });


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
        this.ficheTechniques$.pipe(first()).subscribe(data => {
          let found = false;
          data.forEach((ficheTechnique : FicheTechnique) => {
            if(ficheTechnique.intitule == this.nomPlat) found = true
          });

          if(!found){
            let f : FicheTechnique = new FicheTechnique(this.nomPlat,this.nomCuisinier, this.nbCouverts,this.etapes,this.categorie);
            this.ficheTechniqueService.addFicheTechnique(f);
            ;
            this.router.navigate(["/fiches-techniques"])
          }else{
            console.log("erreur");
            
          }
        });
        
        
      }
    })
  }

  public modifyFt(){
    Swal.fire({
      title: 'Etes vous sur d\'avoir bien terminé ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ficheTechniques$.pipe(first()).subscribe(data => {
          let newF : FicheTechnique = new FicheTechnique(this.nomPlat,this.nomCuisinier, this.nbCouverts,this.etapes,this.categorie, this.id);
          this.ficheTechniqueService.updateFicheTechnique(this.modifyingFt, newF)
          //this.router.navigate(["/fiches-techniques"])
        });
        
        
      }
    })
  }
}