import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-apply-task-time-grid',
  standalone: false,
  templateUrl: './apply-task-time-grid.component.html',
  styleUrl: './apply-task-time-grid.component.css'
})
export class ApplyTaskTimeGridComponent implements OnInit{
  @Input() ApplyTaskTimeFormGroup!:FormGroup
  @Input() resourceDropdown:any[]=[]
  @Input() typeHeaderDropdown:any[]=[]
  applicationEventService: any;
  
  @Input() diceOptions:any= []

  constructor(){
  }
  ngOnInit(): void {
   
  }
  
  updateTotalDuration(): void {
  let inTime = this.ApplyTaskTimeFormGroup.get('inTime')?.value;
  let outTime = this.ApplyTaskTimeFormGroup.get('outTime')?.value;
  if (inTime && outTime) {
    if (inTime.length >= 3 && inTime.includes(':')) {
      const [h, m] = inTime.split(':');
      inTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    }
    if (outTime.length >= 3 && outTime.includes(':')) {
      const [h, m] = outTime.split(':');
      outTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    }
    const [inH, inM] = inTime.split(':').map(Number);
    const [outH, outM] = outTime.split(':').map(Number);
    const inMinutes = inH * 60 + inM;
    const outMinutes = outH * 60 + outM;
    if (outMinutes >= inMinutes) {
      const diff = outMinutes - inMinutes;
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      const formatted = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;

      this.ApplyTaskTimeFormGroup.get('totalDuration')?.patchValue(formatted, {
        emitEvent: false,
      });
    } else {
      this.ApplyTaskTimeFormGroup.get('totalDuration')?.patchValue('', {
        emitEvent: false,
      });
    }
  }
}
updateActualWorkHours(): void {
  let totalDuration = this.ApplyTaskTimeFormGroup.get('totalDuration')?.value;
  let breakDuration = this.ApplyTaskTimeFormGroup.get('breakDuration')?.value;
  if (totalDuration && breakDuration && totalDuration.includes(':') && breakDuration.includes(':')) {
    const [tH, tM] = totalDuration.split(':');
    totalDuration = `${tH.padStart(2, '0')}:${tM.padStart(2, '0')}`;

    const [bH, bM] = breakDuration.split(':');
    breakDuration = `${bH.padStart(2, '0')}:${bM.padStart(2, '0')}`;

   
    const [totalH, totalM] = totalDuration.split(':').map(Number);
    const [breakH, breakM] = breakDuration.split(':').map(Number);

    const totalMinutes = totalH * 60 + totalM;
    const breakMinutes = breakH * 60 + breakM;

    let actualMinutes = totalMinutes - breakMinutes;
    if (actualMinutes < 0) actualMinutes = 0;

    const hours = Math.floor(actualMinutes / 60);
    const minutes = actualMinutes % 60;

    const actualFormatted = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    this.ApplyTaskTimeFormGroup.get('actWorkHours')?.patchValue(actualFormatted, {
      emitEvent: false,
    });
  }
}

validateMonth(event:any){
  const value=Number(event.target.value)
  if(isNaN(value) || value<1 || value>12){
    event.target.value=''
  }
  else{
   event.target.value = value.toString().padStart(2, '0');
  }
}
}




