import {body} from "express-validator";

export const nameCustomerMiddleware = body('name').isString().trim().isLength({
    min: 1,
    max: 25
}).withMessage('name should be less than 25 symbols string');
export const ageCustomerMiddleware = body('age').isNumeric().trim().isLength({
    min: 1,
    max: 80
}).withMessage('age should be less than 500 symbols string');

export const emailCustomerMiddleware = body('email').isEmail().isLength({max: 50})

export const createCustomerDtoValidation = [nameCustomerMiddleware, ageCustomerMiddleware, emailCustomerMiddleware]