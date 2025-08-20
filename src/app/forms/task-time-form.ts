import { IFormObject } from '../interfaces/form-object.interface';
export const ApplyTaskTimeEntity: IFormObject = {
  resource: {
    id: 1,
    label: '',
    value: null,
    type: 'text',
    validations: [
      {
        validator: 'required',
        value: true,
        message: 'Resource should not be blank',
      },
    ],
    disabled: false,
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
        message: 'Type should not be blank',
      },
    ],
    disabled: false,
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
        message: 'Month should not be blank',
      },
       {
          validator: 'mask',
          value: true,
          message: 'Please enter a valid Month',
       }
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
        message: 'Day should not be blank',
      },
       {
          validator: 'mask',
          value: true,
          message: 'Please enter a valid Day',
       }
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
        message: 'Year should not be blank',
      },
       {
          validator: 'mask',
          value: true,
          message: 'Please enter a valid Year',
       }
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
        message: 'In Time should not be blank',
      },
       {
          validator: 'mask',
          value: true,
          message: 'Please enter a valid InTime',
       }
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
        message: 'Out Time should not be blank',
      },
      {
          validator: 'mask',
          value: true,
          message: 'Please enter a valid OutTime',
       },
      {
          validator: 'outTimeErr',
          value: true,
          message: 'Please enter a valid OutTime within 24:00',
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
    validations: [
     
      {
          validator: 'mask',
          value: true,
          message: 'Please enter a valid Break Duration',
       },
       {
         validator: 'greater',
          value: true,
          message: 'Break Duration should not be greater than Total Duration',
       }

    ],
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
  headerId: {
    id: 1,
    label: '',
    value: 0,
    type: '',
    validations: [],
    disabled: false,
  },
  userName: {
    id: 1,
    label: '',
    value: 'PRESENT',
    type: 'text',
    validations: [],
    disabled: false,
  },
  userId: {
    id: 1,
    label: '',
    value: 0,
    type: '',
    validations: [],
    disabled: false,
  },
  headerResourceId: {
    id: 1,
    label: '',
    value: 0,
    type: '',
    validations: [],
    disabled: false,
  },
};
