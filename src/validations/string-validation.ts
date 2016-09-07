import {Validation} from "./validation";
import {ValidationError} from "../validation-error";

export  class StringValidation extends Validation {

    _validate(value: string, toValid: any): ValidationError {
        if (value && typeof value !== 'string') {
            return this.getError();
        }
    }

    protected getMessage() {
        return `${this.getEntity()} must be a string`;
    }

    protected getData(validationCode:string = 'string') {
        return super.getData(validationCode);
    }
}