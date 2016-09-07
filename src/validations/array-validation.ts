import {ValidationError} from "../validation-error";
import {Validation, ValidationInterface} from "./validation";

export class ArrayValidation extends Validation {
    constructor(property: string|symbol, private typeValidation?: (property: string |symbol) => ValidationInterface) {
        super(property)
    }

    _validate(value: any[], toValid: any): Promise<ValidationError>|ValidationError {
        if (value) {
            if (!Array.isArray(value)) {
                return this.getError();
            } else if (this.typeValidation) {
                let errors = this.validateElements(value);

                return errors.then((errors: ValidationError[]) => {
                    if (errors.length) {
                        return this.getElementValidationErrors(errors);
                    }
                });

            }
        }
    }

    protected validateElements(value: any[]): Promise<ValidationError[]> {
        return Promise.all(value.map((element, index: number) => {
            let validator = this.typeValidation(index.toString());
            return validator.validate(value);
        }))
            .then(errors => errors.filter((e)=>!!e));
    }

    protected getElementValidationErrors(errors: ValidationError[]): ValidationError {
        let message = `One or several of the elements of ${this.getEntity()} are not valid`;
        return new ValidationError(message, errors, this.getData("array-element-not-valid"));
    }

    protected getData(validationCode: string = "array") {
        return super.getData(validationCode);
    }

    protected getMessage() {
        return `${this.getEntity()} must be an array`;
    }
}