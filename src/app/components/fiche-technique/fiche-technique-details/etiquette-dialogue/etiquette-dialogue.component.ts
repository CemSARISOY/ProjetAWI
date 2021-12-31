import {Component, Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../fiche-technique-details.component';

@Component({
  selector: 'app-etiquette-dialogue',
  templateUrl: './etiquette-dialogue.component.html',
  styleUrls: ['./etiquette-dialogue.component.css']
})
export class EtiquetteDialogueComponent  {

    dialogForm;
    constructor(
      public dialogRef: MatDialogRef<EtiquetteDialogueComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      public fb: FormBuilder
    ) {
      this.dialogForm = this.fb.group({
        numberOfEtiq: [,[Validators.required]]
      })
    
    }
    
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    
  }
