import { IFormObject } from '../interfaces/form-object.interface';

export const ViewTaskFilterForm: IFormObject = {
    
    userid: {
        id: 1,
        label: 'category',
        value: '',
        type: 'text',
        validations: [],
        disabled: false,
    },
    fromDate: {
        id: 2,
        label: 'Batch From',
        value:'',
        type: 'DateField',
        validations: [
            {
                validator: 'invalidDate',
                value: false,
                message: 'ERROR_MSG.29393',
            },
            {
                validator: 'greaterEffDate',
                value: false,
                message: 'ERROR_MSG.29403',
            },
        ],
        disabled: false,
    },
    toDate: {
        id: 3,
        label: 'To',
        value: '',
        type: 'DateField',
        validations: [
            {
                validator: 'invalidDate',
                value: false,
                message: 'ERROR_MSG.29394',
            },
        ],
        disabled: false,
    },
    
};
