import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FicheTechnique } from 'src/app/models/fiche-technique';
import { FicheTechniqueService } from 'src/app/services/fiche-technique.service';

@Component({
  selector: 'app-fiche-technique-details',
  templateUrl: './fiche-technique-details.component.html',
  styleUrls: ['./fiche-technique-details.component.css']
})
export class FicheTechniqueDetailsComponent implements OnInit {

  queryId : string;
  ficheTechnique$ : Observable<FicheTechnique>;

  constructor(private route : ActivatedRoute, private ficheTechniqueService : FicheTechniqueService) { }

  ngOnInit(): void {
    this.queryId = this.route.snapshot.paramMap.get('id');
    this.ficheTechnique$ = this.ficheTechniqueService.getOneFicheTechnique(this.queryId);

  }

}
