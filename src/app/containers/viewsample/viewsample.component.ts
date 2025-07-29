import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewTaskFilterForm } from '../../forms/print-refund-filter.form';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormGroup } from '@angular/forms';
import { FormUtilService } from '../../services/form-util.service';

@Component({
  selector: 'app-viewsample',
  standalone: false,
  templateUrl: './viewsample.component.html',
  styleUrl: './viewsample.component.css'
})
export class ViewsampleComponent implements OnInit{
    public viewTaskFilterFormGroup!: FormGroup;
    constructor(private formUtilService:FormUtilService ){

    }
   ngOnInit(){
       this.viewTaskFilterFormGroup=this.formUtilService.buildFormGroup(ViewTaskFilterForm);
   }
}
