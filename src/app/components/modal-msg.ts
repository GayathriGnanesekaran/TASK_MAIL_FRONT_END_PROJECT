import { InputError } from "./input-error.model";


export class ModalMsg {
    type: string;
    text?: string | Array<InputError>;
    errors?: Array<InputError>;
    shortCut?: Array<any>;
    constructor(type: string, text?: string, errors?: Array<InputError>, shortcutHelp?: Array<any>) {
        this.type = type;
        this.text = text;
        this.errors = errors;
        this.shortCut = shortcutHelp;
    }
}
