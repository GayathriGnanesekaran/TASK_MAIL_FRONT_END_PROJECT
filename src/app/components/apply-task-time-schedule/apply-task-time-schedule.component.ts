import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApplicationEventService } from '../../services/application-event.service';
import { FormUtilService } from '../../services/form-util.service';
import { TaskGridDetailForm } from '../../forms/task-grid-detail.form';

@Component({
  selector: 'app-apply-task-time-schedule',
  standalone: false,
  templateUrl: './apply-task-time-schedule.component.html',
  styleUrl: './apply-task-time-schedule.component.css'
})
export class ApplyTaskTimeScheduleComponent {
 taskForm: FormGroup;
  showError: boolean = false;
  selectedRow=0;
diceOptions:any= [{codeCode: "DELETE",
    screenName: "Delete",
    actionType: "click"
}]
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

     this.applicationEventService.appEvent$.pipe(takeUntil(this._destroyed$)).subscribe((event) => {
            switch (event.name) {
                case 'DELETE': {
                  console.log('data',event)
                  this.tasks.controls.splice(event.value.index, 1);
                }
  }
})}

  get tasks(): FormArray | any {
    return this.taskForm.get('tasks') as FormArray;
  }

  addInitialRows(count: number) {
    for (let i = 0; i < count; i++) {
    const newRow: FormGroup = this.formUtilService.buildFormGroup(TaskGridDetailForm);
    this.tasks.push(newRow);
    }
  } 
  selectBatchDetail(item:any, index:any) {
        if (this.selectedRow == index) {
            return;
        } else {
          this.selectedRow = index
            // const event: IApplicationEvent = {
            //     name: 'SELECT_BATCH_DETAIL',
            //     component: 'PaymentBatchGridListComponent',
            //     value: { value: item, index: index },
            // };
            // this.applicationEventService.emitAnEvent(event);
        }
    }

  addTaskRow(): void {
    const newRow: FormGroup = this.formUtilService.buildFormGroup(TaskGridDetailForm);
        this.tasks.push(newRow);

        let newTasksArray: any = this.tasks.getRawValue().map((item:any) => {
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
      comments: ['']
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
