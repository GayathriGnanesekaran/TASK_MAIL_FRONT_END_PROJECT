import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApplicationEventService } from '../../services/application-event.service';
import { FormUtilService } from '../../services/form-util.service';
import { TaskGridDetailForm } from '../../forms/task-grid-detail.form';
import moment from 'moment';

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
  value: any;
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

  taskForm: FormGroup;
  showError: boolean = false;
  selectedRow = 0;
  diceOptions: any = [
    { codeCode: 'DELETE', screenName: 'Delete', actionType: 'click' },
  ];
  projectOptions = ['Spriska', 'Condologic', 'BEI'];
  typeOptions = ['Development', 'Meeting', 'Training'];
  isBillableOptions = ['Y', 'N', 'NA'];
  billingTypeOptions = ['Planned', 'Unplanned'];
  public _destroyed$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private applicationEventService: ApplicationEventService,
    private formUtilService: FormUtilService
  ) {
    this.taskForm = this.fb.group({});
    this.taskForm.setControl('tasks', this.fb.array([]));
    // this.taskForm = this.fb.group({
    //   tasks: this.fb.array([])
    // });
    this.addInitialRows(1);
  }
  ngOnInit(): void {
    this.applicationEventService.appEvent$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((event) => {
        switch (event.name) {
          case 'DELETE': {
            console.log('data', event);
            this.tasks.controls.splice(event.value.index, 1);
          }
        }
      });
  }

  get tasks(): FormArray | any {
    return this.taskForm.get('tasks') as FormArray;
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
                  this.tasks.controls[i].get(control)?.patchValue('Invalid Date');
                  this.tasks.controls[i].get(control)?.setErrors({ invalidDate: true });
              }, 50);
              return;
          }
         
          if (
              this.value !== 'Invalid Date' &&
              this.value !== 'Invalid date' &&
              this.value !== '' &&
              this.value !== null 
          ) {
              this.tasks.controls[i].get(control).patchValue(new Date(this.value));
              this.tasks.controls[i].get(control)?.setErrors(null);
               this.tasks.controls[i].markAsDirty();
          }
          if (this.value == '' || this.value == null) {
              if (control == 'fromDate') {
                  this.tasks.controls[i].get(control)?.patchValue(moment().subtract(30, 'days').toDate());
              } else {
                  this.tasks.controls[i].get(control)?.patchValue(moment().toDate());
              }
              this.tasks.controls[i].get(control)?.setErrors(null);
               this.tasks.controls[i].markAsDirty();
          }
      }

  addInitialRows(count: number) {
    for (let i = 0; i < count; i++) {
      const newRow: FormGroup =
        this.formUtilService.buildFormGroup(TaskGridDetailForm);
      this.tasks.push(newRow);
    }
  }

  selectBatchDetail(item: any, index: any) {
    if (this.selectedRow == index) {
      return;
    } else {
      this.selectedRow = index;
      // const event: IApplicationEvent = {
      //     name: 'SELECT_BATCH_DETAIL',
      //     component: 'PaymentBatchGridListComponent',
      //     value: { value: item, index: index },
      // };
      // this.applicationEventService.emitAnEvent(event);
    }
  }

  addTaskRow(): void {
    const newRow: FormGroup =
      this.formUtilService.buildFormGroup(TaskGridDetailForm);
    this.tasks.push(newRow);

    let newTasksArray: any = this.tasks.getRawValue().map((item: any) => {
      return this.formUtilService.buildFormGroup(TaskGridDetailForm, item);
    });
    this.taskForm.setControl('tasks', this.fb.array(newTasksArray));
    // const newRow :any= this.createTaskFormGroup()
    // this.tasks.push(newRow);
    // this.taskForm.setControl('tasks', this.fb.array(this.tasks));
  }

  createTaskFormGroup(): FormGroup {
    return this.fb.group({
      selected: [false],
      project: [''],
      sprint: [''],
      taskName: ['', Validators.required],
      type: [''],
      sowIssueNo: [''],
      isBillable: [''],
      billingType: [''],
      resName: [''],
      team: [''],
      estStartDate: [''],
      estEndDate: [''],
      estHours: [''],
      actStartDate: [''],
      actEndDate: [''],
      startTime: [''],
      endTime: [''],
      actHours: [''],
      percentage: [''],
      status: [''],
      comments: [''],
    });
  }

  saveSelectedTasks() {
    // const selectedTasks = this.tasks.controls
    //   .filter(task => task.get('selected')?.value)
    //   .filter(task => task.get('taskName')?.valid)
    //   .map(task => task.value);
    // if (selectedTasks.length === 0) {
    //   this.showError = true;
    // } else {
    //   this.showError = false;
    //   console.log('Saved Tasks:', selectedTasks);
    //   // Save logic goes here
    // }
  }
  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
