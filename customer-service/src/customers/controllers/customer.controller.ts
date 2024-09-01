import {Request, Response} from 'express';
import {CreateCustomerDto} from "../dto/createCustomerDto";
import {CustomerService} from '../services/customer.service';

const customerService = new CustomerService();

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const {limit = 20, offset = 0} = req.query;

        const customers = await customerService.getAllCustomers(Number(limit), Number(offset));
        res.json(customers);
    } catch (error) {
        res.status(500).json({error: 'Произошла ошибка при получении данных клиентов'});
    }
};

export const addCustomer = async (req: Request, res: Response) => {
    const {name, age, email}: CreateCustomerDto = req.body;

    try {
        const newCustomer = await customerService.addCustomer({name, age, email});
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({error: 'Произошла ошибка при добавлении клиента'});
    }
};
