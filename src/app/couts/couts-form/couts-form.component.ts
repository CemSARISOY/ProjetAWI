import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoutsService } from 'src/app/services/couts.service';
import { Cout } from 'src/app/models/cout';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-couts-form',
  templateUrl: './couts-form.component.html',
  styleUrls: ['./couts-form.component.css']
})
export class CoutsFormComponent implements OnInit {

  coutsForm;


  constructor(public fb: FormBuilder, private coutService: CoutsService) {


    this.coutsForm = this.fb.group({
      coutProdFix: [0,[Validators.required]],
      coutProdPerc: [0,[Validators.required]],
      tauxHorPers: [0,[Validators.required]],
      tauxHorsForf: [0,[Validators.required]],
      charges:'',
      assaisonnement:''
    })

    coutService.getCouts().subscribe(c => {

      this.coutsForm.get('coutProdFix').setValue(c.coutProdFixe)
      this.coutsForm.get('coutProdPerc').setValue(c.coutProdPerc)
      this.coutsForm.get('tauxHorPers').setValue(c.tauxPers)
      this.coutsForm.get('tauxHorsForf').setValue(c.tauxForf)
      this.coutsForm.get('charges').setValue(c.useCharge ? 'Oui' : 'Non')
      this.coutsForm.get('assaisonnement').setValue(c.usePerc ? 'Oui' : 'Non')

      this.controlCharges(c.useCharge);
      this.controlAssaisonnement(c.usePerc);
       
  
     


      // ALLERGENE : new FormControl([this.allergenes])

    })

   

  }

  ngOnInit(): void {
  }


  controlCharges(bool: boolean) {
    if (bool) {
      console.log("enable");
      this.coutsForm.get('tauxHorPers').enable()
      this.coutsForm.get('tauxHorsForf').enable()
    }
    else {
      console.log("disable");
      this.coutsForm.get('tauxHorPers').disable()
      this.coutsForm.get('tauxHorsForf').disable()
    }

  }

  controlAssaisonnement(bool: boolean) {
    if (bool) {
      console.log("enable");
      this.coutsForm.get('coutProdFix').disable()
      this.coutsForm.get('coutProdPerc').enable()
    }
    else {
      console.log("disable");
      this.coutsForm.get('coutProdFix').enable()
      this.coutsForm.get('coutProdPerc').disable()
    }
  }


  OnSubmit(){
    var cout : Cout = {
      useCharge :this.coutsForm.get('charges').value=='Oui'?true:false,
      usePerc : this.coutsForm.get('assaisonnement').value=='OUi'?true:false,
      coutProdFixe : this.coutsForm.get('coutProdFix').value,
      coutProdPerc :this.coutsForm.get('coutProdPerc').value,
      tauxForf :this.coutsForm.get('tauxHorsForf').value,
      tauxPers :this.coutsForm.get('tauxHorPers').value


    }
    this.coutService.update(cout) 
    Swal.fire('Coûts sauvegardés !', '', 'success')
  }
}