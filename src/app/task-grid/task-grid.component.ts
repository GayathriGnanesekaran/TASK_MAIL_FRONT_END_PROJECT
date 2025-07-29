// task-grid.component.ts
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-grid',
  standalone: false,
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent {
saveSelectedRows() {
throw new Error('Method not implemented.');
}
addTaskRow(): void {
  const taskArray = this.taskForm.get('tasks') as FormArray;
  taskArray.push(this.createTaskFormGroup());
}
  // username: string = 'Krish';
  // email: string = 'pkrish@simplesolve.com';

  taskForm: FormGroup;
  showError: boolean = false;

  projectOptions = ['Spriska', 'Condologic', 'BEI'];
  typeOptions = ['Development', 'Meeting', 'Training'];
  isBillableOptions = ['Y', 'N', 'NA'];
  billingTypeOptions = ['Planned', 'Unplanned'];

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      tasks: this.fb.array([])
    });
    this.addInitialRows(1);
  }

  get tasks(): FormArray {
    return this.taskForm.get('tasks') as FormArray;
  }

  addInitialRows(count: number) {
    for (let i = 0; i < count; i++) {
      this.tasks.push(this.createTaskFormGroup());
    }
  }

  createTaskFormGroup(): FormGroup {
    return this.fb.group({
      // selected: [false],
      sno: [''],
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
    const selectedTasks = this.tasks.controls
      .filter(task => task.get('selected')?.value)
      .filter(task => task.get('taskName')?.valid)
      .map(task => task.value);

    if (selectedTasks.length === 0) {
      this.showError = true;
    } else {
      this.showError = false;
      console.log('Saved Tasks:', selectedTasks);
      // 
    }
  }
}




