
import { CreateCustomerDto } from '../dto/createCustomerDto';
import {CustomerData} from "@prisma/client";

export interface ICustomerService {
    getAllCustomers(limit: number, offset: number): Promise<CustomerData[]>;
    addCustomer(data: CreateCustomerDto): Promise<CustomerData>;
}
