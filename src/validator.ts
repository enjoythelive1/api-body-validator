import {ValidationInterface} from "./validations/validation";
import {ValidationError} from "./validation-error";

export class Validator<T> {
    constructor(public toValidate: T, private validations: ValidationInterface[] = []) {

    }

    addValidation(validation: ValidationInterface) {
        this.validations.push(validation);
    }

    removeValidation(validation: ValidationInterface) {
        let index = this.validations.indexOf(validation);
        if (index !== -1) {
            this.validations.splice(index, 1);
        }
    }

    validate(): Promise<ValidationError[]> {
        return Promise.all(this.validations.map((validation: ValidationInterface) => validation.validate(this.toValidate))).then((errors)=> errors.filter((e) => !!e));
    }

    throwIfInvalid(objectName: string = 'The object') {
        return this.validate()
            .then((errors) => {
                    if (errors.length) {
                        throw new ValidationError(`${objectName} is Invalid`, errors);
                    }
                }
            )
    }
}