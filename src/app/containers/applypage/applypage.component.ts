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
    }
    ngOnInit(){
           this.ApplyTaskTimeFormGroup=this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
       }
    
    
}
