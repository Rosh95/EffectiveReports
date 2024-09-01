import { CreateCustomerDto } from '../dto/createCustomerDto';
import { CustomerData } from '@prisma/client';

export interface ICustomerRepository {
    getAllCustomers(limit: number, offset: number): Promise<CustomerData[]>;
    createCustomer(data: CreateCustomerDto): Promise<CustomerData>;
}
