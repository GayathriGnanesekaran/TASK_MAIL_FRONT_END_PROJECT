import { Component, input, Input, NgModule, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  ApplicationEventService,
  IApplicationEvent,
} from '../../services/application-event.service';
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
  @Input() projectDropdown: any[] = [];
  @Input() typeDropdown: any[] = [];
  @Input() isBillableDropdown: any[] = [];
  @Input() billingTypeDropdown: any[] = [];
  @Input() selectDetailIndex = 0;
  @Input() teamDropdown: any[] = [];
  @Input() statusDropdown: any[] = [];
  value: any;

  private _taskDetailFormGroup!: FormGroup;
  @Input() set taskDetailFormGroup(value: FormGroup) {
    this._taskDetailFormGroup = value;
  }
  get taskDetailFormGroup() {
    return this._taskDetailFormGroup;
  }

  private _taskDetailArray!: FormArray;
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
  };

  showError: boolean = false;
  @Input() diceOptions: any = [];
  billingTypeOptions = ['Planned', 'Unplanned'];
  public _destroyed$ = new Subject();
  loggeduser: any;
  constructor(
    private fb: FormBuilder,
    private applicationEventService: ApplicationEventService,
    private formUtilService: FormUtilService,
    private taskmailserviceService: TaskmailserviceService
  ) {
    // this.addInitialRows(1);
  }
  ngOnInit(): void {
    this.loggeduser = this.taskmailserviceService.getLoginSaveSuccess();
  }

  dateValueChange(event: any, control: any, i: number) {
    this.value = null;
    if (
      event !== null &&
      event !== '' &&
      event?.target?.value !== null &&
      event?.target?.value !== ''
    ) {
      this.value = moment(
        event?.target?.value ? event?.target?.value : event
      ).format('MM/DD/YYYY');
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
        this.taskDetailArray.controls[i]
          .get(control)
          ?.patchValue('Invalid Date');
        this.taskDetailArray.controls[i]
          .get(control)
          ?.setErrors({ invalidDate: true });
      }, 50);
      return;
    }

    if (
      this.value !== 'Invalid Date' &&
      this.value !== 'Invalid date' &&
      this.value
    ) {
      this.taskDetailArray.controls[i]
        .get(control)
        ?.patchValue(new Date(this.value));
      this.taskDetailArray.controls[i].get(control)?.setErrors(null);
      this.taskDetailArray.controls[i].markAsDirty();
    }
    if (this.value == '' || this.value == null) {
      this.taskDetailArray.controls[i].get(control)?.patchValue(null);

      this.taskDetailArray.controls[i].markAsDirty();
    }
    if (control === 'actStDt' || control === 'actEndDt') {
      this.validateSameDate(i);
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

  updateActualDuration(i: number): void {
    // let stTime = this.taskDetailArray.controls[i].get('stTime')?.value;
    // let endTime = this.taskDetailArray.controls[i].get('endTime')?.value;
    let stTime = this.timeFormat(
      this.taskDetailArray.controls[i].get('stTime')?.value
    );
    let endTime = this.timeFormat(
      this.taskDetailArray.controls[i].get('endTime')?.value
    );
    if (stTime && endTime) {
      if (stTime.length >= 3 && stTime.includes(':')) {
        const [h, m] = stTime.split(':');
        stTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
      }
      this.taskDetailArray.controls[i]
        .get('stTime')
        ?.patchValue(stTime, { emitEvent: false });
      if (endTime.length >= 3 && endTime.includes(':')) {
        const [h, m] = endTime.split(':');
        endTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
      }
      this.taskDetailArray.controls[i]
        .get('endTime')
        ?.patchValue(endTime, { emitEvent: false });
      const [inH, inM] = stTime.split(':').map(Number);
      const [outH, outM] = endTime.split(':').map(Number);
      const inMinutes = inH * 60 + inM;
      let outMinutes = outH * 60 + outM;
      if (inMinutes === 0) {
        this.taskDetailArray.controls[i].get('stTime')?.setErrors({
          mask: true,
        });
        return;
      }
      if (outMinutes === 0) {
        this.taskDetailArray.controls[i].get('endTime')?.setErrors({
          mask: true,
        });
        return;
      } else {
        if (outMinutes < inMinutes) {
          outMinutes += 24 * 60;
        }
        for (let j = 0; j < this.taskDetailArray.length; j++) {
          if (j !== i) {
            const otherSt = this.timeFormat(
              this.taskDetailArray.controls[j].get('stTime')?.value
            );
            const otherEnd = this.timeFormat(
              this.taskDetailArray.controls[j].get('endTime')?.value
            );

            if (
              otherSt &&
              otherEnd &&
              otherSt.includes(':') &&
              otherEnd.includes(':')
            ) {
              let [oh, om] = otherSt.split(':').map(Number);
              let [eh, em] = otherEnd.split(':').map(Number);
              let otherStart = oh * 60 + om;
              let otherEndMin = eh * 60 + em;

              if (otherEndMin < otherStart) {
                otherEndMin += 24 * 60;
              }

              // Check for overlap
              const overlap =
                (inMinutes < otherEndMin && outMinutes > otherStart) ||
                (otherStart < outMinutes && otherEndMin > inMinutes);

              if (overlap) {
                this.taskDetailArray.controls[i]
                  .get('stTime')
                  ?.setErrors({ overlap: true });
                this.taskDetailArray.controls[i]
                  .get('endTime')
                  ?.setErrors({ overlap: true });
                return;
              }
            }
          }
        }
        const diff = outMinutes - inMinutes;
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        const formatted = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`;

        this.taskDetailArray.controls[i]
          .get('actHours')
          ?.patchValue(formatted, {
            emitEvent: false,
          });
      }
    }
  }


 
  validateSameDate(currentIndex: number): void {
    const currentCtrl = this.taskDetailArray.controls[currentIndex];

    const currentStartStr = currentCtrl.get('actStDt')?.value
      ? new Date(currentCtrl.get('actStDt')?.value).toISOString().split('T')[0]
      : null;

    const currentEndStr = currentCtrl.get('actEndDt')?.value
      ? new Date(currentCtrl.get('actEndDt')?.value).toISOString().split('T')[0]
      : null;

    if (!currentStartStr || !currentEndStr) return;

    let isDifferent = false;

    this.taskDetailArray.controls.forEach((ctrl, idx) => {
      if (idx !== currentIndex) {
        const otherStartStr = ctrl.get('actStDt')?.value
          ? new Date(ctrl.get('actStDt')?.value).toISOString().split('T')[0]
          : null;

        const otherEndStr = ctrl.get('actEndDt')?.value
          ? new Date(ctrl.get('actEndDt')?.value).toISOString().split('T')[0]
          : null;

        if (
          (otherStartStr && otherStartStr !== currentStartStr) ||
          (otherEndStr && otherEndStr !== currentEndStr)
        ) {
          isDifferent = true;
        }
      }
    });

    if (isDifferent) {
      currentCtrl.get('actStDt')?.setErrors({ notSameDate: true });
      currentCtrl.get('actEndDt')?.setErrors({ notSameDate: true });
    } else {
      currentCtrl.get('actStDt')?.setErrors(null);
      currentCtrl.get('actEndDt')?.setErrors(null);
    }
  }
  
  spaceRetrict(i:any, control: string) {
        const trimVal = this.taskDetailArray.controls[i].get(control)?.value?.trim();
        this.taskDetailArray.controls[i].get(control)?.patchValue(trimVal);
    }


  onEstHoursInput(index: number): void {
    const control = this.taskDetailArray.at(index).get('estHours');
    let val: string = control?.value?.toString().trim();

    if (!val) return;

    if (val.includes(':')) {
      const [h, m = '00'] = val.split(':');
      const formatted = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
      control?.setValue(formatted, { emitEvent: false });
      return;
    }

    if (/^\d+$/.test(val)) {
      if (val.length === 4) {
        const hours = val.substring(0, 2);
        const minutes = val.substring(2, 4);
        control?.setValue(
          `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`,
          { emitEvent: false }
        );
      } else {
        control?.setValue(`${val.padStart(2, '0')}:00`, { emitEvent: false });
      }
    }
  }

  timeFormat(value: string): string {
    if (!value) return '';

    // Case 1: Only hour, like "1" or "19"
    if (/^\d{1,2}$/.test(value)) {
      return value.padStart(2, '0') + ':00';
    }

    if (/^\d{1,2}:$/.test(value)) {
      const [h] = value.split(':');
      return h.padStart(2, '0') + ':00';
    }

    if (/^:\d{1,2}$/.test(value)) {
      const [, m] = value.split(':');
      return '00:' + m.padStart(2, '0');
    }

    if (/^\d{1,2}:\d{1,2}$/.test(value)) {
      const [h, m] = value.split(':');
      return h.padStart(2, '0') + ':' + m.padStart(2, '0');
    }

    return value;
  }
  validatePercentage(i: number): void {
    const control = this.taskDetailArray.controls[i].get('percentage');
    let value = control?.value;
    if (typeof value === 'string') {
      value = value.replace('%', '');
    }
    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
      control?.setErrors({ mask: true });
    } else {
      control?.setErrors(null);
    }
  }

  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
