import {ObjectValidation} from "./object-validator";
import {RequiredValidation} from "./required-validation";
import {StringValidation} from "./string-validation";
import {ValidationError} from "../validation-error";

export  class ReferenceValidator extends ObjectValidation {
    constructor(property: string | symbol, private existInDB?: (id:String) => Promise<boolean>) {
        super(property, [
            new RequiredValidation('id'),
            new StringValidation('id'),
            new StringValidation('name'),
        ]);
    }

    _validate(value: any, toValid: any): Promise<ValidationError> {
        return super._validate(value, toValid)
            .then((error)=> {
                if (error) {
                    return error;
                }

                if (this.existInDB) {
                    return this.existInDB(value.id).then((element)=> {
                        if (!element) {
                            return this.getErrorForNonExistingReference();
                        }
                    });
                }
            })
    }

    protected getData(validationCode: string = 'reference') {
        return super.getData(validationCode);
    }

    protected getMessage() {
        return `${this.getEntity()} must be an reference`;
    }

    protected getElementValidationErrors(errors: ValidationError[]): ValidationError {
        return new ValidationError(this.getMessage(), errors, this.getData());
    }

    private getErrorForNonExistingReference() {
        return new ValidationError(`The element ${this.getEntity()} is referencing does not exist`, null, this.getData('reference-not-found'));
    }
}