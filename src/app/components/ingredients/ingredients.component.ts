import { AfterViewInit, Component, ViewChild,OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IngredientsDataSource, IngredientsItem } from './ingredients-datasource';
import {animate, state, style, transition, trigger} from '@angular/animations';
import Swal from 'sweetalert2';
import { IngredientsService } from 'src/app/services/ingredients.service';
// PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//

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
  ingredients : IngredientsItem[]

  constructor(private ingredientService : IngredientsService) {
   
  }

  ngOnInit() {
    this.ingredientService.getAllIngredients().subscribe(ingredient =>  {
      this.dataSource = new IngredientsDataSource(ingredient)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      this.ingredients = ingredient
    })
   /* this.dataSource = new IngredientsDataSource(this.ingredients);
    console.log(this.ingredients) */

  }

  ngOnChanges(){
   // this.dataSource = new IngredientsDataSource(this.ingredients);
   
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

  updateIngredient = (ingredientItem : IngredientsItem) =>{
    this.ingredientService.updateIngredient(ingredientItem)
    console.log(ingredientItem)
    for (var i = 0; i<this.ingredients.length;i++){
      if (this.ingredients[i].id == ingredientItem.id){
        this.ingredients[i] = ingredientItem
        this.dataSource = new IngredientsDataSource(this.ingredients)
        this.paginator.initialized
        return 
      }
  }
}

deleteIngredient = (ingredientItem : IngredientsItem) =>{
  this.ingredientService.deleteIngredient(ingredientItem)
  this.ingredients = this.ingredients.filter(item => item !== ingredientItem)
  this.dataSource = new IngredientsDataSource(this.ingredients)
  return
}


addIngredient = (ingredientItem : IngredientsItem) =>{
  this.ingredientService.addIngredient(ingredientItem)
  this.isHide=true
  console.log(ingredientItem.id)
  this.ingredients.push(ingredientItem);
  this.dataSource = new IngredientsDataSource(this.ingredients)
  return 
}

showAddForm = ()=>this.isHide = !this.isHide;

isAllergenic = (ingredientItem:IngredientsItem)=> {

  if (ingredientItem.ALLERGENES.length == 0){
    return false 
  }
  else return true
}

pageEvent = (event)=>{
  console.log("paginator event")
}


deleteNotification = (ingredient : IngredientsItem) => {Swal.fire({
  title: 'Voulez vous vraiment supprimer cet ingrédient ?',
  text: ingredient.CODE +" "+ingredient.LIBELLE + " "+ingredient.CATEGORIE,
  icon: 'warning',
  showDenyButton: true,
  confirmButtonText: 'Oui',
  denyButtonText: `Non`,
}).then((result) => {
  if (result.isConfirmed) {
    this.deleteIngredient(ingredient)
    Swal.fire('Ingrédient supprimé!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Suppression annulée', '', 'info')
  }
})
}
// PDF
public openPDF():void {
  let DATA = document.getElementById('htmlData');
      
  html2canvas(DATA).then(canvas => {
      
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      
      PDF.save('angular-demo.pdf');
  });     
  }
//
}

/*
var EXAMPLE_DATA: IngredientsItem[] = [
  {id : "rgggrgeqggr", CODE : 1, LIBELLE : "kebab", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "rgqgrgg", CODE : 2, LIBELLE : "tacos", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "rggrgegg", CODE : 3, LIBELLE : "pizza", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "qregzrjetj", CODE : 4, LIBELLE : "uWu", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "dyjdjtjdytyjtdj", CODE : 5, LIBELLE : "nem", CATEGORIE : "VIANDES", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "dyjjydyjjy", CODE : 6, LIBELLE : "poutine", CATEGORIE : "CAT2", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "ydtjdytjyj", CODE : 7, LIBELLE : "grec", CATEGORIE : "CAT2", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "yjdyjdz(y", CODE : 8, LIBELLE : "frites", CATEGORIE : "CAT2", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "jghzqferght", CODE : 9, LIBELLE : "sushis", CATEGORIE : "CAT2", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "zjfyuixh", CODE : 10, LIBELLE : "choucroute", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "zq'tjrrsrty", CODE : 11, LIBELLE : "ragoût", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "q't(hzsujrtj", CODE : 12, LIBELLE : "raviolis", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "etiiu-rsy", CODE : 13, LIBELLE : "poireaux", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "'(s(eysry", CODE : 14, LIBELLE : "carottes", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
  {id : "ertzte('t'e", CODE : 15, LIBELLE : "pomme de terre", CATEGORIE : "TEST", PRIX_UNITAIRE : 1, UNITE : "K" ,STOCK : 0},
];
*/
