import {ValidationError} from "../validation-error";
import {Validation, ValidationInterface} from "./validation";

export class ObjectValidation extends Validation {
    constructor(property: string|symbol, private propertyValidations?: ValidationInterface[]) {
        super(property)
    }

    _validate(value: any, toValid: any): Promise<ValidationError> {
        if (value) {
            if (typeof value !== 'object') {
                return Promise.resolve(this.getError());
            } else if (this.propertyValidations) {
                let errors = this.validateElements(value);
                return errors.then((errors: ValidationError[]) => {
                    if (errors.length) {
                        return this.getElementValidationErrors(errors);
                    }
                });
            }
        }

        return Promise.resolve(null);
    }

    protected validateElements(value: any): Promise<ValidationError[]> {
        return Promise.all(this.propertyValidations.map((validation: ValidationInterface) => validation.validate(value)))
            .then(errors => errors.filter((e)=>!!e));
    }

    protected getElementValidationErrors(errors: ValidationError[]): ValidationError {
        let message = `One or several of the properties values of ${this.getEntity()} are not valid`;
        return new ValidationError(message, errors, this.getData("object-property-not-valid"));
    }

    protected getData(validationCode: string = 'object') {
        return super.getData(validationCode);
    }

    protected getMessage() {
        return `${this.getEntity()} must be an object`;
    }
}