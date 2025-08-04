import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputError } from '../interfaces/input-error.model';
import { FormValidation, IFormObject } from '../interfaces/form-object.interface';


@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    modalRef: any;
    exec = true;
    constructor(private modalService: NgbModal) {}
   

    
 

    parseValidationErrors(formControls:any, formObject: IFormObject): Array<InputError> {
        const errors: Array<InputError> = [];
        for (const key in formControls) {
            if (formControls.hasOwnProperty(key)) {
                if (formControls[key].errors !== null) {
                    for (const item in formControls[key].errors) {
                        if (formControls[key].errors.hasOwnProperty(item)) {
                            if (formObject[key].validations !== null) {
                                const validations:FormValidation[] | undefined = formObject[key].validations;
                              if(validations !== undefined){
                                  validations.forEach((er) => {
                                    if (item.toLowerCase() === er.validator.toLowerCase()) {
                                        errors.push(
                                            new InputError(
                                                key,
                                                `${
                                                    er.message
                                                }`
                                            )
                                        );
                                    }
                                });
                              }
                            }
                        }
                    }
                }
            }
        }

        return errors;
    }

  
}
