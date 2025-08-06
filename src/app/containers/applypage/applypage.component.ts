import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormGroup } from '@angular/forms';
import { FormUtilService } from '../../services/form-util.service';
import { ApplyTaskTimeEntity } from '../../forms/task-time-form';
import { ApplicationEventService } from '../../services/application-event.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { TaskmailserviceService } from '../../services/taskmailservice.service';
import { InputError } from '../../interfaces/input-error.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../services/validation.service';
import { ModalMsg } from '../../interfaces/modal-msg';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';

@Component({
  selector: 'app-applypage',
  standalone: false,
  templateUrl: './applypage.component.html',
  styleUrl: './applypage.component.css',
})
export class ApplypageComponent implements OnInit {
  public ApplyTaskTimeFormGroup!: FormGroup;
  public _destroyed$ = new Subject();
  resourceDropdown = [];
  typeDropdown = [];
  loggeduser: any;
  pageErrors!: InputError[];
  public valpopupInst!: NgbModalRef | null;
  diceOptions: any;

  constructor(
    private formUtilService: FormUtilService,
    private applicationEventService: ApplicationEventService,
    private taskmailserviceService: TaskmailserviceService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {
    this.ApplyTaskTimeFormGroup =
      this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
    console.log('data', this.ApplyTaskTimeFormGroup);
  }

  ngOnInit() {
    this.loggeduser = this.taskmailserviceService.getLoginSaveSuccess();

    forkJoin({
      type: this.taskmailserviceService.fetchDropDownValue('TYPE_HEADER'),
      resource: this.taskmailserviceService.fetchDropDownValue('USERSNAME'),
    }).subscribe((data) => {
      if (data) {
        if (data.type && data.type.length > 0) {
          this.typeDropdown = data.type;
        }
        if (data.resource && data.resource.length > 0) {
          this.resourceDropdown = data.resource;
        }
      }
      const defaultResource: any = this.resourceDropdown.find(
        (x: any) => x.codeName === this.loggeduser.userName.toUpperCase()
      );
      this.ApplyTaskTimeFormGroup?.get('resource')?.patchValue(
        defaultResource.codeName
      );
    });
    this.applicationEventService.appEvent$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((event) => {
        switch (event.name) {
          case 'EDIT': {
            console.log('data', event);
            this.ApplyTaskTimeFormGroup.patchValue(event.value);
            return;
          }
          case 'DICE_BUTTON_CLICK':{
            if(event?.value?.hostComponent ==='ApplyTaskTimeGridComponent')
            this.taskmailserviceService.fetchDropDownValue('DICE_RESET').subscribe((res)=>{
              this.diceOptions =res;
            })
            return;
          }
          case 'RESET':{          
           this.ApplyTaskTimeFormGroup =
      this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
       const defaultResource: any = this.resourceDropdown.find(
        (x: any) => x.codeName === this.loggeduser.userName.toUpperCase()
      );
            return;
          }
        }
      });
  }
  saveTaskTimeDetails(event?: any, type?: string) {
    if (this.ApplyTaskTimeFormGroup.invalid) {
      this.pageErrors = this.validationService.parseValidationErrors(
        this.ApplyTaskTimeFormGroup.controls,
        ApplyTaskTimeEntity
      );
      if (this.pageErrors && !this.valpopupInst) {
        this.valpopupInst = this.modalService.open(AlertPopupComponent, {
          backdrop: 'static',
        });
        this.valpopupInst.componentInstance.content = new ModalMsg(
          'error',
          '',
          this.pageErrors
        );
        this.valpopupInst.result.then((result) => {
          if (result === 'Close click' || result === 'Cross click') {
            this.valpopupInst?.close();
            this.valpopupInst = null;
          }
        });
      }
    } else {
      if (this.ApplyTaskTimeFormGroup.get('headerId')?.value === 0) {
        this.taskmailserviceService
          .saveTaskHeader(this.ApplyTaskTimeFormGroup.getRawValue())
          .subscribe((res) => {
            if (res) {
              this.ApplyTaskTimeFormGroup.patchValue(res);
            }
          });
      } else {
        this.taskmailserviceService
          .updateTaskHeader(
            this.ApplyTaskTimeFormGroup.getRawValue()           
          )
          .subscribe((res) => {
            if (res) {
              this.ApplyTaskTimeFormGroup.patchValue(res);
            }
          });
      }
    }
  }
  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
