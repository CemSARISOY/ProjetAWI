import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheTechnique } from 'src/app/models/fiche-technique';
import { FicheTechniqueService } from 'src/app/services/fiche-technique.service';

@Component({
  selector: 'app-fiche-technique-list',
  templateUrl: './fiche-technique-list.component.html',
  styleUrls: ['./fiche-technique-list.component.css']
})
export class FicheTechniqueListComponent implements OnInit {

  public fichesTechniques : Observable<FicheTechnique[]>

  constructor(private ficheTechniqueService : FicheTechniqueService) { }

  ngOnInit(): void {
    this.fichesTechniques = this.ficheTechniqueService.getAllFicheTechniques();
  }

}
