import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormGroup } from '@angular/forms';
import { FormUtilService } from '../../services/form-util.service';
import { ViewTaskFilterForm } from '../../forms/view-filter-form';
import { TaskmailserviceService } from '../../services/taskmailservice.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-viewsample',
  standalone: false,
  templateUrl: './viewsample.component.html',
  styleUrl: './viewsample.component.css'
})
export class ViewsampleComponent implements OnInit{
    public viewTaskFilterFormGroup!: FormGroup;
    useridDropdown=[]
    constructor(private formUtilService:FormUtilService,
       private taskmailserviceService: TaskmailserviceService,

    ){

    }
   ngOnInit(){
       this.viewTaskFilterFormGroup=this.formUtilService.buildFormGroup(ViewTaskFilterForm);
       
         this.taskmailserviceService.fetchDropDownValue('USERSNAME').subscribe((data) => {
             if (data) {
               if (data && data.length > 0) {
                 this.useridDropdown = data;
               }
             }
            
           });
     }
}
