import {Validation} from "./validation";
import {ValidationError} from "../validation-error";

export class MustNotHaveValidation extends Validation {

    _validate(value: string, toValid: any): ValidationError {
        if (!(typeof value === 'undefined' || value === null)) {
            return this.getError();
        }
    }

    protected getMessage() {
        return `${this.getEntity()} must not have value`;
    }

    protected getData(validationCode: string = 'must-not-have') {
        return super.getData(validationCode);
    }
}