import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormGroup } from '@angular/forms';
import { FormUtilService } from '../../services/form-util.service';
import { ApplyTaskTimeEntity } from '../../forms/batch-details.form';

@Component({
  selector: 'app-applypage',
  standalone: false,
  templateUrl:'./applypage.component.html',
  styleUrl: './applypage.component.css'
})
export class ApplypageComponent implements OnInit {
  public ApplyTaskTimeFormGroup!: FormGroup;
    constructor(private formUtilService:FormUtilService ){
      this.ApplyTaskTimeFormGroup=this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
console.log('data',this.ApplyTaskTimeFormGroup)
    }
    ngOnInit(){
           this.ApplyTaskTimeFormGroup.patchValue({
    resource:'Gayathri',
    types:'present',
     month:'07',
     day:'30',
     year:'2025',
     intime:'10:30',
     outtime:'19:30',
     totalduration:'9:00',
      breakduration:'1:00',
       actworkhrs:'8:00',
       comments:'task completion'
   })
       }
    
    
}
