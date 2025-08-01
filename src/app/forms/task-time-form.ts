import { IFormObject } from '../interfaces/form-object.interface';
export const  ApplyTaskTimeEntity: IFormObject = {
    resource: {
        id: 1,
        label: '',
        value: null,
        type: 'text',
        validations: [
            {
                validator: 'required',
                value: true,
                message: 'resource is mandatory',
            }
        ],
        disabled:false,
    },
    type: {
        id: 1,
        label: '',
        value: 'PRESENT',
        type: 'text',
        validations: [
             {
                validator: 'required',
                value: true,
                message: 'type is mandatory',
            }
        ],
        disabled:false,
    },
    month: {
        id: 5,
        label: '',
        value: null,
        type: 'InputText',
        validations: [
            {
                validator: 'required',
                value: true,
                message: 'month is mandatory',
            },
        ],
        disabled: false,
    },
     date: {
        id: 5,
        label: '',
        value: null,
        type: 'InputText',
        validations: [
            {
                validator: 'required',
                value: true,
                message: 'date is mandatory',
            },
        ],
        disabled: false,
    },
     year: {
        id: 5,
        label: '',
        value: null,
        type: 'InputText',
        validations: [
            {
                validator: 'required',
                value: true,
                message: 'year is mandatory',
            },
        ],
        disabled: false,
    },
     inTime: {
        id: 5,
        label: '',
        value: null,
        type: 'InputText',
        validations: [
            {
                validator: 'required',
                value: true,
                message: 'Intime is mandatory',
            },
        ],
        disabled: false,
    },
     outTime: {
        id: 5,
        label: '',
        value: null,
        type: 'InputText',
        validations: [
            {
                validator: 'required',
                value: true,
                message: 'Outtime is mandatory',
            },
        ],
        disabled: false,
    },
    totalDuration: {
        id: 1,
        label: '',
        value: null,
        type: '',
        validations: [],
        disabled: false,
    },
    breakDuration: {
        id: 1,
        label: '',
        value: null,
        type: 'text',
        validations: [],
        disabled: false,
    },
    actWorkHours: {
        id: 1,
        label: '',
        value: null,
        type: 'text',
        validations: [],
        disabled: false,
    },
     comments: {
        id: 1,
        label: '',
        value: null,
        type: 'text',
        validations: [],
        disabled: false,
    },

    
    
}

