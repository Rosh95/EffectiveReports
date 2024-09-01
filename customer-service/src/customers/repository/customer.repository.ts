import { PrismaClient } from '@prisma/client';
import {CreateCustomerDto} from "../dto/createCustomerDto";
import {ICustomerRepository} from "./customer.repository.interface";

const prisma = new PrismaClient();

export class CustomerRepository implements ICustomerRepository {
    async getAllCustomers(limit: number, offset: number) {
        return prisma.customerData.findMany({
            skip: offset,
            take: limit,
        });
    }

    async createCustomer(data: CreateCustomerDto) {
        return prisma.customerData.create({
            data,
        });
    }
}