import { Component, input, Input, NgModule, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApplicationEventService, IApplicationEvent } from '../../services/application-event.service';
import { FormUtilService } from '../../services/form-util.service';
import { TaskGridDetailForm } from '../../forms/task-grid-detail.form';
import moment from 'moment';
import { TaskmailserviceService } from '../../services/taskmailservice.service';

@Component({
  selector: 'app-apply-task-time-schedule',
  standalone: false,
  templateUrl: './apply-task-time-schedule.component.html',
  styleUrl: './apply-task-time-schedule.component.css',
})
export class ApplyTaskTimeScheduleComponent {
  @Input() ApplyTaskTimeFormGroup!: FormGroup;
  categoryesList = [];
  userList = [];
  @Input() projectDropdown:any[] = [];
  @Input() typeDropdown:any[] = [];
  @Input() isBillableDropdown:any[] = [];
  @Input() billingTypeDropdown:any[] = [];
  @Input() selectDetailIndex= 0;
    value: any;

  private _taskDetailFormGroup!: FormGroup;
    @Input() set taskDetailFormGroup(value: FormGroup) {
        this._taskDetailFormGroup = value;
    }
    get taskDetailFormGroup() {
        return this._taskDetailFormGroup;
    }

    private _taskDetailArray!: FormArray ;
    @Input() set taskDetailArray(value: FormArray) {
        this._taskDetailArray = value;
    }
    get taskDetailArray() {
        return this._taskDetailArray;
    }
  public minDate: Date = moment('01/01/1800 12:00:00 AM').toDate();
  public maxDate: Date = moment('12/31/9999 11:59:59 PM').toDate();
  bsConfig = {
    dateInputFormat: 'MM/DD/YYYY',
    containerClass: 'theme-si',
    showWeekNumbers: false,
    adaptivePosition: true,
    customTodayClass: 'custom-today-class',
    isAnimated: true,
    minDate: this.minDate,
    maxDate: this.maxDate,
  }

  showError: boolean = false;
  diceOptions: any = [
    { codeCode: 'DELETE', screenName: 'Delete', actionType: 'click' },
  ];
  billingTypeOptions = ['Planned', 'Unplanned'];
  public _destroyed$ = new Subject();
  loggeduser: any;
  constructor(
    private fb: FormBuilder,
    private applicationEventService: ApplicationEventService,
    private formUtilService: FormUtilService,
    private taskmailserviceService:TaskmailserviceService
  ) {

    // this.addInitialRows(1);
  }
  ngOnInit(): void {
   this.loggeduser = this.taskmailserviceService.getLoginSaveSuccess()
    // this.applicationEventService.appEvent$
    //   .pipe(takeUntil(this._destroyed$))
    //   .subscribe((event) => {
    //     switch (event.name) {
         
    //     }
    //   });
  }



      dateValueChange(event:any, control:any,i:number) {
          this.value = null;
          if (event !== null && event !== '' && event?.target?.value !== null && event?.target?.value !== '') {
              this.value = moment(event?.target?.value ? event?.target?.value : event).format('MM/DD/YYYY');
          }
          if (
              this.value === 'Invalid Date' ||
              this.value == 'Invalid date' ||
              new Date(this.minDate) > new Date(this.value) ||
              new Date(this.maxDate) < new Date(this.value)
          ) {
              setTimeout(() => {
                  var elmnt: any = document.getElementById(control);
                  if (elmnt) elmnt.value = 'Invalid Date';
                  this.taskDetailArray.controls[i].get(control)?.patchValue('Invalid Date');
                  this.taskDetailArray.controls[i].get(control)?.setErrors({ invalidDate: true });
              }, 50);
              return;
          }
         
          if (
              this.value !== 'Invalid Date' &&
              this.value !== 'Invalid date' &&
              this.value !== '' &&
              this.value !== null 
          ) {
              this.taskDetailArray.controls[i].get(control)?.patchValue(new Date(this.value));
              this.taskDetailArray.controls[i].get(control)?.setErrors(null);
               this.taskDetailArray.controls[i].markAsDirty();
          }
          if (this.value == '' || this.value == null) {
              if (control == 'fromDate') {
                  this.taskDetailArray.controls[i].get(control)?.patchValue(moment().subtract(30, 'days').toDate());
              } else {
                  this.taskDetailArray.controls[i].get(control)?.patchValue(moment().toDate());
              }
              this.taskDetailArray.controls[i].get(control)?.setErrors(null);
               this.taskDetailArray.controls[i].markAsDirty();
          }
      }



  selectBatchDetail(item: any, index: any) {
      const event: IApplicationEvent = {
            name: 'SELECTED_TASK_DETAILS',
            component: 'ApplyTaskTimeScheduleComponent',
            value: { item, index },
        };
        this.applicationEventService.emitAnEvent(event);
    
  }

  addTaskRow(): void {
  const event: IApplicationEvent = {
    name: 'ADDING_NEW_TASK',
    component: 'ApplyTaskTimeScheduleComponent',
    value: '',
  };
  this.applicationEventService.emitAnEvent(event);
}

 updateActualDuration(i:number): void {
  let stTime = this.taskDetailArray.controls[i].get('stTime')?.value;
  let endTime = this.taskDetailArray.controls[i].get('endTime')?.value;
  
  if (stTime && endTime) {
    if (stTime.length >= 3 && stTime.includes(':')) {
      const [h, m] = stTime.split(':');
      stTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    }
    if (endTime.length >= 3 && endTime.includes(':')) {
      const [h, m] = endTime.split(':');
      endTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    }

   
    const [inH, inM] = stTime.split(':').map(Number);
    const [outH, outM] = endTime.split(':').map(Number);

    const inMinutes = inH * 60 + inM;
    const outMinutes = outH * 60 + outM;

    if (outMinutes >= inMinutes) {
      const diff = outMinutes - inMinutes;
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      const formatted = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;

      this.taskDetailArray.controls[i].get('actHours')?.patchValue(formatted, {
        emitEvent: false,
      });
    } else {
      this.taskDetailArray.controls[i].get('actHours')?.patchValue('', {
        emitEvent: false,
      });
    }
  }


  // addTaskRow(): void {
  //   const event: IApplicationEvent = {
  //       name: 'ADDING_NEW_TASK',
  //       component: 'ApplyTaskTimeScheduleComponent',
  //       value: '',
  //   };
  //   this.applicationEventService.emitAnEvent(event);
  //   const newRow: FormGroup =
  //     this.formUtilService.buildFormGroup(TaskGridDetailForm);
  //   this.taskDetailArray.push(newRow);

  //   let newTasksArray: any = this.taskDetailArray.getRawValue().map((item: any) => {
  //     return this.formUtilService.buildFormGroup(TaskGridDetailForm, item);
  //   });
  //   this.taskDetailFormGroup.setControl('taskDetailArray', this.fb.array(newTasksArray));
  //   this.taskDetailArray.controls[this.selectDetailIndex].get("resName").patchValue(this.loggeduser?.userName);
   
  // }


  // saveSelectedTasks() {
    // const selectedTasks = this.taskDetailArray.controls
    //   .filter(task => task.get('selected')?.value)
    //   .filter(task => task.get('taskName')?.valid)
    //   .map(task => task.value);
    // if (selectedTasks.length === 0) {
    //   this.showError = true;
    // } else {
    //   this.showError = false;
    //   console.log('Saved taskDetailArray:', selectedTasks);
    //   // Save logic goes here
    // }
  }
  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
