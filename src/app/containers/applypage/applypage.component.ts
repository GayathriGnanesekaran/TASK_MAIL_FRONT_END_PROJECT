import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
import { TaskGridDetailForm } from '../../forms/task-grid-detail.form';

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
  headerDatas: any;
  projectDropdown = [];
  isBillableDropdown = [];
  billingTypeDropdown = [];
  typeHeaderDropdown = [];

  taskDetailFormGroup!: FormGroup;
  taskDetailArray!: FormArray;
  selectDetailIndex = 0;

  constructor(
    private formUtilService: FormUtilService,
    private applicationEventService: ApplicationEventService,
    private taskmailserviceService: TaskmailserviceService,
    private modalService: NgbModal,
    private validationService: ValidationService,
    private fb: FormBuilder
  ) {
    this.ApplyTaskTimeFormGroup =
      this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
    console.log('data', this.ApplyTaskTimeFormGroup);
    this.ApplyTaskTimeFormGroup.markAsDirty();
    this.taskDetailFormGroup =
      this.formUtilService.buildReactiveForm(TaskGridDetailForm);
    this.taskDetailArray = <FormArray>(
      this.taskDetailFormGroup.controls['taskDetailsList']
    );
  }

  ngOnInit() {
    this.loggeduser = this.taskmailserviceService.getLoginSaveSuccess();
    this.headerDatas = this.taskmailserviceService.getHeaderSuccess();

    forkJoin({
      typeHeader: this.taskmailserviceService.fetchDropDownValue('TYPE_HEADER'),
      resource: this.taskmailserviceService.fetchDropDownValue('USERSNAME'),
      project: this.taskmailserviceService.fetchDropDownValue('PROJECT'),
      type: this.taskmailserviceService.fetchDropDownValue('TYPE'),
      isBillable: this.taskmailserviceService.fetchDropDownValue('ISBILLABLE'),
      billingType:
        this.taskmailserviceService.fetchDropDownValue('BILLINGTYPE'),
    }).subscribe((data) => {
      if (data) {
        if (data.typeHeader && data.typeHeader.length > 0) {
          this.typeHeaderDropdown = data.typeHeader;
        }
        if (data.resource && data.resource.length > 0) {
          this.resourceDropdown = data.resource;
        }
        if (data.project && data.project.length > 0) {
          this.projectDropdown = data.project;
        }
        if (data.type && data.type.length > 0) {
          this.typeDropdown = data.type;
        }
        if (data.isBillable && data.isBillable.length > 0) {
          this.isBillableDropdown = data.isBillable;
        }
        if (data.billingType && data.billingType.length > 0) {
          this.billingTypeDropdown = data.billingType;
        }
      }
      if (this.loggeduser?.userName) {
        const defaultResource: any = this.resourceDropdown.find(
          (x: any) => x.codeName === this.loggeduser?.userName.toUpperCase()
        );
        this.ApplyTaskTimeFormGroup?.get('resource')?.patchValue(
          defaultResource?.codeName
        );
      }
      const defaultResource: any = this.resourceDropdown.find(
        (x: any) => x.codeName === this.loggeduser.userName.toUpperCase()
      );
      this.ApplyTaskTimeFormGroup?.get('resource')?.patchValue(
        defaultResource.codeName
      );
      if (this.headerDatas) {
        this.ApplyTaskTimeFormGroup.patchValue(this.headerDatas);
      }
    });
    this.applicationEventService.appEvent$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((event) => {
        switch (event.name) {
          case 'EDIT': {
            this.ApplyTaskTimeFormGroup.patchValue(event.value);
            return;
          }
          case 'DICE_BUTTON_CLICK': {
            if (event?.value?.hostComponent === 'ApplyTaskTimeGridComponent')
              this.taskmailserviceService
                .fetchDropDownValue('DICE_RESET')
                .subscribe((res) => {
                  this.diceOptions = res;
                });
            return;
          }
          case 'RESET': {
            this.ApplyTaskTimeFormGroup =
              this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
            const defaultResource: any = this.resourceDropdown.find(
              (x: any) => x.codeName === this.loggeduser.userName.toUpperCase()
            );
            this.ApplyTaskTimeFormGroup?.get('resource')?.patchValue(
              defaultResource.codeName
            );
            return;
          }

          case 'ADDING_NEW_TASK': {
            if (this.ApplyTaskTimeFormGroup.dirty) {
              this.saveTaskTimeDetails('ADDING_NEW_TASK');
            } else if (this.taskDetailArray.invalid) {
              this.validationError(
                (
                  this.taskDetailArray.controls[
                    this.selectDetailIndex
                  ] as FormGroup
                ).controls,
                TaskGridDetailForm['taskDetailsList'].subForm
              );
            } else {
              this.addNewTaskDetail();
              return;
            }
            return;
          }
          case 'DELETE': {
            this.selectDetailIndex =
              event?.value?.index != 0 ? event?.value?.index - 1 : 0;
            this.taskDetailArray.removeAt(event?.value?.index);
            return;
          }
          case 'SELECTED_TASK_DETAILS': {
            this.selectDetailIndex = event?.value?.index;
            return;
          }
        }
      });
  }

  addNewTaskDetail() {
    this.selectDetailIndex = this.taskDetailArray.length;
    this.taskDetailArray.push(
      this.formUtilService.buildFormGroup(
        TaskGridDetailForm['taskDetailsList'].subForm
      )
    );
    this.taskDetailArray.controls[this.selectDetailIndex]
      .get('headerId')
      ?.patchValue(this.ApplyTaskTimeFormGroup.get('headerId')?.value);
    this.taskDetailArray.controls[this.selectDetailIndex]
      .get('userName')
      ?.patchValue(this.loggeduser.userName);
    this.taskDetailArray.controls[this.selectDetailIndex]
      .get('userId')
      ?.patchValue(this.loggeduser.userId);
    this.taskDetailArray.updateValueAndValidity();
  }

  validationError(controls?: any, objects?: any) {
    this.pageErrors = this.validationService.parseValidationErrors(
      controls,
      objects
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
  }

  cancelTaskDetailArray() {
    this.taskDetailArray.clear();
  }

  saveTaskTimeDetails(type?: string) {
    if (this.ApplyTaskTimeFormGroup.invalid) {
      this.validationError(
        this.ApplyTaskTimeFormGroup.controls,
        ApplyTaskTimeEntity
      );
    } else if (this.taskDetailArray.invalid) {
      this.validationError(
        (this.taskDetailArray.controls[this.selectDetailIndex] as FormGroup)
          .controls,
        TaskGridDetailForm['taskDetailsList'].subForm
      );
    } else {
      if (this.ApplyTaskTimeFormGroup.dirty) {
        this.saveTaskHeader(type);
      }
      if (this.taskDetailArray.dirty) {
        this.saveTaskDetails(type);
      }
    }
  }

  saveTaskDetails(type?: string) {
    if (
      this.taskDetailArray.controls[this.selectDetailIndex].get('detailsId')
        ?.value === 0
    ) {
      this.taskmailserviceService
        .saveTasksDetails(this.taskDetailArray.getRawValue())
        .subscribe((res) => {
          if (res) {
            this.taskDetailFormGroup =
              this.formUtilService.buildReactiveForm(TaskGridDetailForm);
            this.taskDetailArray = <FormArray>(
              this.taskDetailFormGroup.controls['taskDetailsList']
            );
            res.forEach((element: any) => {
              this.taskDetailArray.push(
                this.formUtilService.buildFormGroup(
                  TaskGridDetailForm['taskDetailsList'].subForm,
                  {
                    ...element,
                  }
                )
              );
            });
            this.taskDetailArray.updateValueAndValidity();

            if (type == 'ADDING_NEW_TASK') {
              this.addNewTaskDetail();
            }
          }
        });
    } else {
      this.taskmailserviceService
        .updateTasksDetails(this.taskDetailArray.getRawValue())
        .subscribe((res) => {
          if (res) {
            this.taskDetailArray.push(
              this.formUtilService.buildFormGroup(
                TaskGridDetailForm['taskDetailsList'].subForm
              )
            );
            res.forEach((element: any) => {
              this.taskDetailArray.push(
                this.formUtilService.buildFormGroup(
                  TaskGridDetailForm['taskDetailsList'].subForm,
                  {
                    ...element,
                  }
                )
              );
            });
            if (type == 'ADDING_NEW_TASK') {
              this.addNewTaskDetail();
            }
          }
        });
    }
  }

  saveTaskHeader(type?: string) {
    if (this.ApplyTaskTimeFormGroup.get('headerId')?.value === 0) {
      this.taskmailserviceService
        .saveTaskHeader(this.ApplyTaskTimeFormGroup.getRawValue())
        .subscribe((res) => {
          if (res) {
            this.ApplyTaskTimeFormGroup.patchValue(res);
            this.ApplyTaskTimeFormGroup.markAsPristine();
          }
        });
    } else {
      this.taskmailserviceService
        .updateTaskHeader(this.ApplyTaskTimeFormGroup.getRawValue())
        .subscribe((res) => {
          if (res) {
            this.ApplyTaskTimeFormGroup.patchValue(res);
            this.ApplyTaskTimeFormGroup.markAsPristine();
          }
        });
    }
  }

  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
