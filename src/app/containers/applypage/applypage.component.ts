import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormGroup } from '@angular/forms';
import { FormUtilService } from '../../services/form-util.service';
import { ApplyTaskTimeEntity } from '../../forms/task-time-form';
import { ApplicationEventService } from '../../services/application-event.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-applypage',
  standalone: false,
  templateUrl: './applypage.component.html',
  styleUrl: './applypage.component.css',
})
export class ApplypageComponent implements OnInit {
  public ApplyTaskTimeFormGroup!: FormGroup;
  public _destroyed$ = new Subject();

  constructor(
    private formUtilService: FormUtilService,
    private applicationEventService: ApplicationEventService
  ) {
    this.ApplyTaskTimeFormGroup =
      this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
    console.log('data', this.ApplyTaskTimeFormGroup);
  }
  ngOnInit() {
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
