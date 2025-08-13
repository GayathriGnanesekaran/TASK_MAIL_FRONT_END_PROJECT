import { IFormObject } from '../interfaces/form-object.interface';

export const ViewTaskFilterForm: IFormObject = {
    
    userName: {
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
                message: 'Please enter a valid From Date',
            },
               {
                validator: 'greater',
                value: false,
                message: 'From Date should not be greater than To Date',
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
                message: 'Please enter a valid To Date',
            },
        ],
        disabled: false,
    },
    
};
