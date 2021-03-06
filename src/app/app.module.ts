import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { IngredientFormComponent } from './components/ingredient-form/ingredient-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { FicheTechniqueListComponent } from './components/fiche-technique/fiche-technique-list/fiche-technique-list.component';
import { FicheTechniqueFormComponent } from './components/fiche-technique/fiche-technique-form/fiche-technique-form.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EtapeFormComponent } from './components/fiche-technique/fiche-technique-form/etape-form/etape-form.component';
import { FicheTechniqueDetailsComponent } from './components/fiche-technique/fiche-technique-details/fiche-technique-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatCardModule } from '@angular/material/card';
import { CoutsFormComponent } from './couts/couts-form/couts-form.component';
import {MatRadioModule} from '@angular/material/radio';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'
registerLocaleData(localeFr)
import {MatDialogModule} from '@angular/material/dialog';
import { EtiquetteDialogueComponent } from './components/fiche-technique/fiche-technique-details/etiquette-dialogue/etiquette-dialogue.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const route = [
  {path : '', redirectTo : "/fiches-techniques", pathMatch : 'full', name: 'Fiches Techniques'},
  {path: 'fiches-techniques', component:FicheTechniqueListComponent, name: 'Fiches Techniques'},
  {path: 'fiches-techniques/create', component:FicheTechniqueFormComponent},
  {path: 'fiches-techniques/:id', component:FicheTechniqueDetailsComponent},
  {path: 'fiches-techniques/:id/modify', component:FicheTechniqueFormComponent},
  {path: 'ingredients', component:IngredientsComponent},
  {path: 'couts', component:CoutsFormComponent},
  {path: '**', component:NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    IngredientsComponent,
    IngredientFormComponent,
    FicheTechniqueListComponent,
    FicheTechniqueFormComponent,
    EtapeFormComponent,
    FicheTechniqueDetailsComponent,
    NotFoundComponent,
    CoutsFormComponent,
    EtiquetteDialogueComponent,

  ],
  imports: [
    BrowserModule,
    /*provideFirebaseApp(() => initializeApp(environment.firebase)), // using compat mode
    provideFirestore(() => getFirestore()),*/
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot(route),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    DragDropModule,
    MatAutocompleteModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule

  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
