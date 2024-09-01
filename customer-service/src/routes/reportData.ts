import {Router} from 'express';
import {addCustomer, getCustomers} from '../customers/controllers/customer.controller';
import {createCustomerDtoValidation} from "../customers/middleware/createCustomerDtoValidation";

const router = Router();

router.get('/customers', getCustomers);

router.post('/customers', createCustomerDtoValidation, addCustomer);

export default router;
