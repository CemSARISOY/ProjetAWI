import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiche-technique-form',
  templateUrl: './fiche-technique-form.component.html',
  styleUrls: ['./fiche-technique-form.component.css']
})
export class FicheTechniqueFormComponent implements OnInit {
  nomPlat : String = "";
  nomCuisinier : String = "Sébastien";
  nbCouverts : number;
  constructor() { }

  ngOnInit(): void {
  }

}
