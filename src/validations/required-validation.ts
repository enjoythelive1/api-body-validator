import {Validation} from "./validation";
import {ValidationError} from "../validation-error";

export  class RequiredValidation extends Validation {

    _validate(value: string, toValid: any): ValidationError {
        if (!value) {
            return this.getError();
        }
    }

    protected getMessage() {
        return `${this.getEntity()} is required`;
    }

    protected getData(validationCode:string = 'required') {
        return super.getData(validationCode);
    }
}