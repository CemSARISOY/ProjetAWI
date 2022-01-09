import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredients } from './models/ingredients';
import { IngredientsService } from './services/ingredients.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  router : String;

  constructor(private _router: Router){
    _router.events.subscribe( () => {
      this.router = _router.url;
    })
  }

  title = 'ProjetAWI';

  ngOnInit(){



  }
}
