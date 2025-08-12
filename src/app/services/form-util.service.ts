import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormValidation, IFormObject } from '../interfaces/form-object.interface';

@Injectable({ providedIn: 'root' })
export class FormUtilService {
    constructor(private formBuilder: FormBuilder) {}



    buildFormGroup(formObjects: IFormObject, fval: any = null) {
        const group = this.formBuilder.group({});
        for (const [key, object] of Object.entries(formObjects)) {
            group.addControl(
                key,
                this.formBuilder.control(
                    {
                        value: fval === null ? object.value : fval[key],
                        disabled: object.disabled,
                    },
                    this.buildFormControlValitaion(object.validations)
                )
            );
        }
        return group;
    }

     buildReactiveForm(formObjects: IFormObject) {
        const group = this.formBuilder.group({});
        for (const [key, formObject] of Object.entries(formObjects)) {
            switch (formObject.type) {
                case 'FormGroup':
                    group.addControl(key, this.buildFormGroup(formObject.subForm));
                    break;
                case 'FormArray':
                    group.addControl(
                        key,
                        this.formBuilder.array(this.buildFormArray(formObject.subForm, formObject.value))
                    );
                    break;
                default:
                    group.addControl(
                        key,
                        this.formBuilder.control(
                            formObject.value,
                            this.buildFormControlValitaion(formObject.validations)
                        )
                    );
                    break;
            }
        }
        return group;
    }
    buildFormArray(formObject:any, length:number) {
        const controls = [];
        for (let index = 0; index < length; index++) {
            controls.push(this.buildFormGroup(formObject));
        }
        return controls;
    }


    buildFormControlValitaion(validations: FormValidation[] | undefined) {
        // Setting up form validations
        const controlValidations: any[] = [];
        if (validations) {
            validations.forEach((validation) => {
                controlValidations.push(this.setValidator(validation.validator, validation.value));
            });
        }
        return controlValidations;
    }




    private setValidator(type:any, value:any) {
        switch (type) {
            case 'min': {
                return Validators.min(value);
            }
            case 'max': {
                return Validators.max(value);
            }
            case 'required': {
                return Validators.required;
            }
            case 'requiredTrue': {
                return Validators.requiredTrue;
            }
            case 'email': {
                return Validators.email;
            }
            case 'minLength': {
                return Validators.minLength(value);
            }
            case 'maxLength': {
                return Validators.maxLength(value);
            }
            case 'pattern': {
                return Validators.pattern(value);
            }
            default: {
                return Validators.nullValidator;
            }
        }
    }
}
