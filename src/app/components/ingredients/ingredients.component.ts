import { AfterViewInit, Component, ViewChild,OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IngredientsDataSource, IngredientsItem } from './ingredients-datasource';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Ingredients } from 'src/app/models/ingredients';



@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  
})
export class IngredientsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IngredientsItem>;
  dataSource: IngredientsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['CODE', 'LIBELLE' ,'PRIX_UNITAIRE','UNITE','CATEGORIE'];
  expandedElement: IngredientsItem | null;
  expansable : boolean = true;
  isHide : boolean = true;


  constructor() {
    this.dataSource = new IngredientsDataSource(EXAMPLE_DATA);
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  DeleteMode() {
    this.expansable = false;
    console.log(this.expansable)
    var i = this.displayedColumns.length -1
    while (this.displayedColumns[i] != 'CATEGORIE'){
      console.log(this.displayedColumns)
      this.displayedColumns.pop()
      console.log(this.displayedColumns)
      i+=-1
    }
    this.displayedColumns.push('DELETE');
   }


  ViewMode(){
    this.expansable = true;
    console.log(this.expansable)
    var i = this.displayedColumns.length -1
    while (this.displayedColumns[i] != 'CATEGORIE'){
      this.displayedColumns.pop()
      i+=-1
    }

  }

  expand(element){
    if(this.expansable) this.expandedElement = this.expandedElement === element ? null : element;
    else return null;
  }

  updateIngredient = (ingredient : IngredientsItem) =>{
    for (var i = 0; i<EXAMPLE_DATA.length;i++){
      if (EXAMPLE_DATA[i].id = ingredient.id){
        console.log(ingredient.id)
        EXAMPLE_DATA[i] = ingredient
        this.dataSource = new IngredientsDataSource(EXAMPLE_DATA)
        return 
      }
  }
}

deleteIngredient = (ingredient : IngredientsItem) =>{
  EXAMPLE_DATA = EXAMPLE_DATA.filter(item => item !== ingredient)
  this.dataSource = new IngredientsDataSource(EXAMPLE_DATA)
  return
}


addIngredient = (ingredient : IngredientsItem) =>{
  this.isHide=true
  console.log(ingredient.id)
  EXAMPLE_DATA.push(ingredient);
  this.dataSource = new IngredientsDataSource(EXAMPLE_DATA)
  return 
}

showAddForm = ()=>this.isHide = !this.isHide;

getAllergenes = (ingredient : IngredientsItem) => {
  //TODO 
  console.log("get allergenes")
  return ['Crustacé','Céleri']
}

isAllergenic = (ingredient:IngredientsItem)=> {
  if (this.getAllergenes(ingredient).length == 0){
    return false 
  }
  else return true
}

  
 

}


var EXAMPLE_DATA: IngredientsItem[] = [
  {id : "rgggrgeqggr", CODE : 1, LIBELLE : "kebab", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "rgqgrgg", CODE : 2, LIBELLE : "tacos", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "rggrgegg", CODE : 3, LIBELLE : "pizza", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "qregzrjetj", CODE : 4, LIBELLE : "uWu", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "dyjdjtjdytyjtdj", CODE : 5, LIBELLE : "nem", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "dyjjydyjjy", CODE : 6, LIBELLE : "poutine", CATEGORIE : "CAT2", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "ydtjdytjyj", CODE : 7, LIBELLE : "grec", CATEGORIE : "CAT2", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "yjdyjdz(y", CODE : 8, LIBELLE : "frites", CATEGORIE : "CAT2", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "jghzqferght", CODE : 9, LIBELLE : "sushis", CATEGORIE : "CAT2", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "zjfyuixh", CODE : 10, LIBELLE : "choucroute", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "zq'tjrrsrty", CODE : 11, LIBELLE : "ragoût", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "q't(hzsujrtj", CODE : 12, LIBELLE : "raviolis", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "etiiu-rsy", CODE : 13, LIBELLE : "poireaux", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "'(s(eysry", CODE : 14, LIBELLE : "carottes", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K"},
  {id : "ertzte('t'e", CODE : 15, LIBELLE : "pomme de terre", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K"},
];

