import { IFormObject } from '../interfaces/form-object.interface';

export const TaskGridDetailForm: IFormObject = {
  taskDetailsList: {
    id: 0,
    label: 'taskDetailsList',
    value: null,
    type: 'FormArray',
    subForm: {
      detailsId: {
        id: 1,
        label: 'detailsId',
        value: 0,
        type: 'hidden',
        validations: [],
        disabled: false,
      },
      detailsResourceId: {
        id: 1,
        label: '',
        value: 0,
        type: '',
        validations: [],
        disabled: false,
      },
      headerId: {
        id: 1,
        label: 'headerId',
        value: '',
        type: 'hidden',
        validations: [],
        disabled: false,
      },
      userName: {
        id: 1,
        label: 'userName',
        value: '',
        type: 'hidden',
        validations: [],
        disabled: false,
      },
      userId: {
        id: 1,
        label: 'userId',
        value: '',
        type: 'hidden',
        validations: [],
        disabled: false,
      },
      selected: {
        id: 1,
        label: 'selected',
        value: '',
        type: 'text',
        validations: [],
        disabled: false,
      },
      project: {
        id: 1,
        label: 'project',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Project is mandatory',
          },
        ],
        disabled: false,
      },
      sprint: {
        id: 1,
        label: 'Sprint',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Sprint is mandatory',
          },
        ],
        disabled: false,
      },
      taskName: {
        id: 1,
        label: 'taskName',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Task Name is mandatory',
          },
        ],
        disabled: false,
      },
      type: {
        id: 1,
        label: 'type',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Type is mandatory',
          },
        ],
        disabled: false,
      },
      sowIssueNo: {
        id: 1,
        label: 'sowIssueNo',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'SOW / Issue No is mandatory',
          },
        ],
        disabled: false,
      },
      isBillable: {
        id: 1,
        label: 'isBillable',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Is Billable is mandatory',
          },
        ],
        disabled: false,
      },

      billingType: {
        id: 1,
        label: 'billingType',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Billing Type is mandatory',
          },
        ],
        disabled: false,
      },
      resName: {
        id: 1,
        label: 'resName',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Res Name is mandatory',
          },
        ],
        disabled: false,
      },
      team: {
        id: 1,
        label: 'team',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'team is mandatory',
          },
        ],
        disabled: false,
      },
      estStDt: {
        id: 1,
        label: 'estStDt',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'invalidDate',
            value: true,
            message: 'Please enter a valid Est Start Date',
          },
        ],
        disabled: false,
      },
      estEndDt: {
        id: 1,
        label: 'estEndDt',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'invalidDate',
            value: true,
            message: 'Please enter a valid Est End Date',
          },
        ],
        disabled: false,
      },
      estHours: {
        id: 1,
        label: 'estHours',
        value: '',
        type: 'text',
        validations: [],
        disabled: false,
      },
      actStDt: {
        id: 1,
        label: 'actStDt',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Act Start Date is mandatory',
          },
          {
            validator: 'invalidDate',
            value: true,
            message: 'Please enter a valid Act Start Date',
          },
        ],
        disabled: false,
      },
      actEndDt: {
        id: 1,
        label: 'actEndDt',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Act End Date is mandatory',
          },
          {
            validator: 'invalidDate',
            value: true,
            message: 'Please enter a valid Act End Date',
          },
        ],
        disabled: false,
      },
      stTime: {
        id: 1,
        label: 'stTime',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Start Time is mandatory',
          },
        ],
        disabled: false,
      },
      endTime: {
        id: 1,
        label: 'endTime',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'End Time is mandatory',
          },
        ],
        disabled: false,
      },

      actHours: {
        id: 1,
        label: 'actHours',
        value: '',
        type: 'text',
        validations: [
          {
            value: true,
            message: 'Act Hours is mandatory',
          },
        ],
        disabled: false,
      },
      percentage: {
        id: 1,
        label: 'percentage',
        value: 0,
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Percentage is mandatory',
          },
        ],
        disabled: false,
      },
      status: {
        id: 1,
        label: 'status',
        value: '',
        type: 'text',
        validations: [
          {
            validator: 'required',
            value: true,
            message: 'Status is mandatory',
          },
        ],
        disabled: false,
      },
      comments: {
        id: 1,
        label: 'estHours',
        value: '',
        type: 'text',
        validations: [],
        disabled: false,
      },

      toDate: {
        id: 3,
        label: 'To',
        value: '',
        type: 'DateField',
        validations: [
          // {
          //     validator: 'invalidDate',
          //     value: false,
          //     message: 'ERROR_MSG.29394',
          // },
        ],
        disabled: false,
      },
    },
    validations: [],
    disabled: false,
  },
};
