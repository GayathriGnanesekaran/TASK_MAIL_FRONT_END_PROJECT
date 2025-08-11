import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormGroup } from '@angular/forms';
import { FormUtilService } from '../../services/form-util.service';
import { ViewTaskFilterForm } from '../../forms/view-filter-form';
import { TaskmailserviceService } from '../../services/taskmailservice.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { ApplicationEventService } from '../../services/application-event.service';
import moment from 'moment';
@Component({
  selector: 'app-viewsample',
  standalone: false,
  templateUrl: './viewsample.component.html',
  styleUrl: './viewsample.component.css',
})
export class ViewsampleComponent implements OnInit {
  public viewTaskFilterFormGroup!: FormGroup;
  useridDropdown = [];
  loggeduser: any;
  selectDetailsRow = 0;
  viewTaskTimeArray:any[] = [];
  viewTaskScheduleArray = [];
  public _destroyed$ = new Subject();
  constructor(
    private formUtilService: FormUtilService,
    private applicationEventService: ApplicationEventService,
    private taskmailserviceService: TaskmailserviceService,
    private  cdr:ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.loggeduser = this.taskmailserviceService.getLoginSaveSuccess();
    this.viewTaskFilterFormGroup =
      this.formUtilService.buildFormGroup(ViewTaskFilterForm);

    this.taskmailserviceService
      .fetchDropDownValue('USERSNAME')
      .subscribe((data) => {
        if (data) {
          if (data && data.length > 0) {
            this.useridDropdown = data;
          }
        }
        const defaultResource: any = this.useridDropdown.find(
          (x: any) => x.codeName === this.loggeduser.userName.toUpperCase()
        );
        this.viewTaskFilterFormGroup
          ?.get('userName')
          ?.patchValue(defaultResource.codeName);
      });
    this.applicationEventService.appEvent$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((event: any) => {
        switch (event.name) {
          case 'SEARCH_TASK': {
            const fromDate = moment(this.viewTaskFilterFormGroup.get('fromDate')?.value).format('MM/DD/YYYY');
            const toDate = moment(this.viewTaskFilterFormGroup.get('toDate')?.value).format('MM/DD/YYYY');
           this.viewTaskFilterFormGroup.get('fromDate')?.patchValue(fromDate);
           this.viewTaskFilterFormGroup.get('toDate')?.patchValue(toDate)
            this.taskmailserviceService
              .getTaskHeader(this.viewTaskFilterFormGroup.getRawValue())
              .subscribe((data) => {
                this.viewTaskTimeArray = data;
                this.cdr.detectChanges();
              });

          return;
          }
          case 'SELECTED__ROW':{
            this.selectDetailsRow = event?.value.index;
            this.taskmailserviceService
            .getTaskTimeHeader(this.viewTaskTimeArray[this.selectDetailsRow].headerId).subscribe((data)=>{
              this.viewTaskScheduleArray=data;
                 this.cdr.detectChanges();
            })
            return;
          }
          default :
          break;
        }
      });
  }
}
