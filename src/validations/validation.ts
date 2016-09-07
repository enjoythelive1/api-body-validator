import {ValidationError} from "../validation-error";
import "core-js";

export interface ValidationInterface {
    property: string | symbol;
    isValid: (toValid: any) => boolean;
    validate: (toValid: any) => Promise<ValidationError> | ValidationError;
}

export class Validation implements ValidationInterface {

    constructor(public property: string | symbol = '') {
    }

    isValid(toValid: any): boolean {
        return !this.validate(toValid);
    };

    validate(toValid: any): Promise<ValidationError> {
        let value = this.property ? toValid[this.property] : toValid;
        return Promise.resolve(this._validate(value, toValid));
    }

    protected _validate(value: any, toValid: any): Promise<ValidationError> | ValidationError {
        return null;
    }

    protected getError(): ValidationError {
        let message = this.getMessage();
        let data = this.getData();
        return new ValidationError(message, null, data);
    }

    protected getData(validationCode: string = 'invalid') {
        return this.property ? {[this.property]: validationCode} : validationCode;
    }

    protected getMessage() {
        return `${this.getEntity()} is invalid`;
    }

    protected getEntity() {
        return this.property ? `The property ${this.property}` : 'The value';
    }

}