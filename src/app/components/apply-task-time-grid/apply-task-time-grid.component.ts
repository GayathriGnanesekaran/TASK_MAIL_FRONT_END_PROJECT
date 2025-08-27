import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ApplicationEventService,
  IApplicationEvent,
} from '../../services/application-event.service';

@Component({
  selector: 'app-apply-task-time-grid',
  standalone: false,
  templateUrl: './apply-task-time-grid.component.html',
  styleUrl: './apply-task-time-grid.component.css',
})
export class ApplyTaskTimeGridComponent implements OnInit {
  @Input() ApplyTaskTimeFormGroup!: FormGroup;
  @Input() resourceDropdown: any[] = [];
  @Input() typeHeaderDropdown: any[] = [];

  @Input() diceOptions: any = [];

  constructor(private applicationEventService: ApplicationEventService) {}
  ngOnInit(): void {}

  updateTotalDuration(control: string): void {
    // let inTime = this.ApplyTaskTimeFormGroup.get('inTime')?.value;
    // let outTime = this.ApplyTaskTimeFormGroup.get('outTime')?.value;
    let inTime = this.formatTimeInput(
      this.ApplyTaskTimeFormGroup.get('inTime')?.value
    );
    let outTime = this.formatTimeInput(
      this.ApplyTaskTimeFormGroup.get('outTime')?.value
    );

    this.ApplyTaskTimeFormGroup.get('inTime')?.patchValue(inTime, {
      emitEvent: false,
    });
    this.ApplyTaskTimeFormGroup.get('outTime')?.patchValue(outTime, {
      emitEvent: false,
    });
    if (inTime && outTime) {
      if (inTime.length >= 3 && inTime.includes(':')) {
        const [h, m] = inTime.split(':');
        inTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
      }
      this.ApplyTaskTimeFormGroup.get('inTime')?.patchValue(inTime, {
        emitEvent: false,
      });
      if (outTime.length >= 3 && outTime.includes(':')) {
        const [h, m] = outTime.split(':');
        outTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
      }
      this.ApplyTaskTimeFormGroup.get('outTime')?.patchValue(outTime, {
        emitEvent: false,
      });
      const [inH, inM] = inTime.split(':').map(Number);
      let [outH, outM] = outTime.split(':').map(Number);
      if (outTime === '24:00') {
        outH = 24;
        outM = 0;
      } else {
        [outH, outM] = outTime.split(':').map(Number);
      }
      const inMinutes = inH * 60 + inM;
      let outMinutes = outH === 24 && outM === 0 ? 24 * 60 : outH * 60 + outM;
      // let outMinutes = outH === 24 && outM === 0 ? 24 * 60 : outH * 60 + outM;
      if (inMinutes === 0) {
        this.ApplyTaskTimeFormGroup.get('inTime')?.setErrors({
          mask: true,
        });
      }
      if (outH > 24 || (outH === 24 && outM > 0)) {
        this.ApplyTaskTimeFormGroup.get('outTime')?.setErrors({
          outTimeErr: true,
        });
        return;
      }
      if (outMinutes === 0) {
        this.ApplyTaskTimeFormGroup.get('outTime')?.setErrors({
          mask: true,
        });
      } else {
        if (outMinutes < inMinutes) {
          outMinutes += 24 * 60;
        }
        const diff = outMinutes - inMinutes;
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        const formatted = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`;

        this.ApplyTaskTimeFormGroup.get('totalDuration')?.patchValue(
          formatted,
          {
            emitEvent: false,
          }
        );
      }
    }
    if (this.ApplyTaskTimeFormGroup.get('breakDuration')?.value) {
      this.updateActualWorkHours();
    } else {
      this.ApplyTaskTimeFormGroup.get('actWorkHours')?.patchValue(
        this.ApplyTaskTimeFormGroup.get('totalDuration')?.value
      );
    }
    //  else {
    //   this.ApplyTaskTimeFormGroup.get(control)?.setErrors( {
    //   mask:true
    //   });
  }
  formatTimeInput(value: string): string {
    if (!value) return '';

    // Case 1: Only hour, like "1" or "19"
    if (/^\d{1,2}$/.test(value)) {
      return value.padStart(2, '0') + ':00';
    }

    // Case 2: hour and colon only, like "4:"
    if (/^\d{1,2}:$/.test(value)) {
      const [h] = value.split(':');
      return h.padStart(2, '0') + ':00';
    }

    // Case 3: colon and minute only, like ":5"
    if (/^:\d{1,2}$/.test(value)) {
      const [, m] = value.split(':');
      return '00:' + m.padStart(2, '0');
    }

    // Case 4: full hour:minute like "4:5"
    if (/^\d{1,2}:\d{1,2}$/.test(value)) {
      const [h, m] = value.split(':');
      return h.padStart(2, '0') + ':' + m.padStart(2, '0');
    }

    return value;
  }
  checkYear(): void {
    let year = +this.ApplyTaskTimeFormGroup.get('year')?.value;
    if (year === 0) {
      this.ApplyTaskTimeFormGroup.get('year')?.setErrors({ mask: true });
    }
  }
  updateActualWorkHours(): void {
    // let totalDuration = this.ApplyTaskTimeFormGroup.get('totalDuration')?.value;
    // let breakDuration = this.ApplyTaskTimeFormGroup.get('breakDuration')?.value;
    let totalDuration = this.formatTimeInput(
      this.ApplyTaskTimeFormGroup.get('totalDuration')?.value
    );
    let breakDuration = this.formatTimeInput(
      this.ApplyTaskTimeFormGroup.get('breakDuration')?.value
    );

    // Patch formatted values back
    this.ApplyTaskTimeFormGroup.get('totalDuration')?.patchValue(
      totalDuration,
      { emitEvent: false }
    );
    this.ApplyTaskTimeFormGroup.get('breakDuration')?.patchValue(
      breakDuration,
      { emitEvent: false }
    );
    if (
      totalDuration &&
      breakDuration &&
      totalDuration.includes(':') &&
      breakDuration.includes(':')
    ) {
      const [tH, tM] = totalDuration.split(':');
      totalDuration = `${tH.padStart(2, '0')}:${tM.padStart(2, '0')}`;
      const [bH, bM] = breakDuration.split(':');
      breakDuration = `${bH.padStart(2, '0')}:${bM.padStart(2, '0')}`;
      const [totalH, totalM] = totalDuration.split(':').map(Number);
      const [breakH, breakM] = breakDuration.split(':').map(Number);
      const totalMinutes = totalH * 60 + totalM;
      const breakMinutes = breakH * 60 + breakM;
      if (breakMinutes >= totalMinutes) {
        this.ApplyTaskTimeFormGroup.get('breakDuration')?.setErrors({
          greater: true,
        });
        return;
      }
      let actualMinutes = totalMinutes - breakMinutes;
      if (actualMinutes < 0) actualMinutes = 0;
      const hours = Math.floor(actualMinutes / 60);
      const minutes = actualMinutes % 60;
      const actualFormatted = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;

      this.ApplyTaskTimeFormGroup.get('actWorkHours')?.patchValue(
        actualFormatted,
        {
          emitEvent: false,
        }
      );
    }
    if (!this.ApplyTaskTimeFormGroup.get('breakDuration')?.value) {
      this.ApplyTaskTimeFormGroup.get('actWorkHours')?.patchValue(
        this.ApplyTaskTimeFormGroup.get('totalDuration')?.value
      );
    }
  }


  validateMonth(event: any) {
  const num = Number(event.target.value);

  if (isNaN(num) || num < 1 || num > 12) {
    this.ApplyTaskTimeFormGroup.get('month')?.setErrors({ mask: true });
  } else {
    const formatted = num.toString().padStart(2, '0');
    event.target.value = formatted;
    this.ApplyTaskTimeFormGroup.get('month')?.setValue(formatted, { emitEvent: false });
   if (this.ApplyTaskTimeFormGroup.get('date')?.value) {
      this.validateDay(this.ApplyTaskTimeFormGroup.get('date')?.value);
    }
  }
}

  validateDay(event: any) {
    let value = event?.target?.value ? event?.target?.value : event;
    const month = Number(this.ApplyTaskTimeFormGroup.get('month')?.value);
    const day = Number(value);
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let maxDay = daysInMonth[month - 1] || 31;
    const currentYear = new Date().getFullYear();
    if (
      month === 2 &&
      ((currentYear % 4 === 0 && currentYear % 100 !== 0) ||
        currentYear % 400 === 0)
    ) {
      maxDay = 29;
    }
    if (isNaN(day) || day < 1 || day > maxDay) {
      this.ApplyTaskTimeFormGroup.get('date')?.setErrors({ mask: true });
    } else {
      const formatted = day.toString().padStart(2, '0');
      value = formatted;
      this.ApplyTaskTimeFormGroup.get('date')?.patchValue(formatted);
    }
  }
  changeResource() {
    const event: IApplicationEvent = {
      name: 'CHANGE_RESOURCE',
      component: 'ApplyTaskTimeScheduleComponent',
      value: '',
    };
    this.applicationEventService.emitAnEvent(event);
  }
}
