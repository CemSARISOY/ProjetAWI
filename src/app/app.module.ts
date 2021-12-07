import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

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
const route = [
  {path : '',component:IngredientsComponent},
  {path: 'fiches-techniques', component:FicheTechniqueListComponent},
  {path: 'fiches-techniques/create', component:FicheTechniqueFormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    IngredientsComponent,
    IngredientFormComponent,
    FicheTechniqueListComponent,
    FicheTechniqueFormComponent
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
    FormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
