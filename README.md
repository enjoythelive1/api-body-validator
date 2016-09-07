# api-body-validator
Easily build powerful validators for objects to validate objects

## Installing

```sh
npm install --save api-body-validator
``` 


## Using

```js
var apiBodyValidator = require('api-body-validator');

var validator = new apiBodyValidator.Validator(obj, [
    new apiBodyValidator.RequiredValidation('name'),
    new apiBodyValidator.StringValidation('name'),
    new apiBodyValidator.ArrayValidation('arrayOfStuff'),
    new apiBodyValidator.ArrayValidation('arrayOfObject', (property) => new apiBodyValidator.ObjectValidation(property, [
        new apiBodyValidator.StringValidation('value')
    ])
]);

validator.validate() //returns a promise with all validation errors
validator.throwIfInvalid() //returns a rejected promise with all validation errors
```
