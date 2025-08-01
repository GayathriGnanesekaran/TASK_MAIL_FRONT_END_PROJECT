import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormGroup } from '@angular/forms';
import { FormUtilService } from '../../services/form-util.service';
import { ApplyTaskTimeEntity } from '../../forms/task-time-form';
import { ApplicationEventService } from '../../services/application-event.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { TaskmailserviceService } from '../../services/taskmailservice.service';

@Component({
  selector: 'app-applypage',
  standalone: false,
  templateUrl: './applypage.component.html',
  styleUrl: './applypage.component.css',
})
export class ApplypageComponent implements OnInit {
  public ApplyTaskTimeFormGroup!: FormGroup;
  public _destroyed$ = new Subject();
  resourceDropdown=[]
  typeDropdown=[]
  loggeduser: any;

  constructor(
    private formUtilService: FormUtilService,
    private applicationEventService: ApplicationEventService,
    private taskmailserviceService : TaskmailserviceService
  ) {
    this.ApplyTaskTimeFormGroup =
      this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
    console.log('data', this.ApplyTaskTimeFormGroup);
         
  }
  ngOnInit() {
    this.loggeduser = this.taskmailserviceService.getLoginSaveSuccess()
    this.ApplyTaskTimeFormGroup.patchValue({
      resource: 'Gayathri',
      types: 'present',
      month: '07',
      day: '30',
      year: '2025',
      intime: '10:30',
      outtime: '19:30',
      totalduration: '9:00',
      breakduration: '1:00',
      actworkhrs: '8:00',
      comments: 'task completion',
    });
     forkJoin({
            type: this.taskmailserviceService.fetchDropDownValue('TYPE_HEADER'),
            resource: this.taskmailserviceService.fetchDropDownValue('USERSNAME'),
        }).subscribe((data) => {
                if (data) {
                    if (data.type && data.type.length > 0) {
                        this.typeDropdown=data.type
                    }
                    if (data.resource && data.resource.length > 0 ) {
                       this.resourceDropdown=data.resource
                    }
                }
               const defaultResource:any= this.resourceDropdown.find((x:any)=>x.codeName === this.loggeduser.userName.toUpperCase());
               this.ApplyTaskTimeFormGroup?.get('resource')?.patchValue(defaultResource.codeName) 
               
            });
    this.applicationEventService.appEvent$.pipe(takeUntil(this._destroyed$)).subscribe((event) => {
        switch (event.name) {
          case 'EDIT': {
            console.log('data', event);
            this.ApplyTaskTimeFormGroup.patchValue(event.value);
            return;
          }
        }
      });
        
  }

  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
