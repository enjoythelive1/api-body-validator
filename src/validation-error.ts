export class ValidationError extends Error {
    statusCode: number = 400;

    constructor(public message: string, public validationErrors:ValidationError[] = [], public data?: any) {
        super(message);
    }
}