import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IApplicationEvent } from '../../services/application-event.service';


@Component({
  selector: 'app-apply-task-time-grid',
  standalone: false,
  templateUrl: './apply-task-time-grid.component.html',
  styleUrl: './apply-task-time-grid.component.css'
})
export class ApplyTaskTimeGridComponent implements OnInit{
  @Input() ApplyTaskTimeFormGroup!:FormGroup
  @Input() resourceDropdown:any[]=[]
  @Input() typeDropdown:any[]=[]
  applicationEventService: any;

  constructor(){
  }
  ngOnInit(): void {
   
  }
  
    save() {
        const event: IApplicationEvent = {
            name: 'SAVE_COMPANY_CONTACTS',
            component: 'CompanyContactsDetailsFormComponent',
            value: '',
        };
        this.applicationEventService.emitAnEvent(event);
    }
}
