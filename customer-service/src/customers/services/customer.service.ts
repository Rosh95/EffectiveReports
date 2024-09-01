import {CreateCustomerDto} from "../dto/createCustomerDto";
import {CustomerRepository} from "../repository/customer.repository";
import {ICustomerService} from "./customer.service.interface";

export class CustomerService implements ICustomerService {
    private customerRepository: CustomerRepository;

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    async getAllCustomers(limit: number, offset: number) {
        return this.customerRepository.getAllCustomers(limit, offset);
    }

    async addCustomer(data: CreateCustomerDto) {
        return this.customerRepository.createCustomer(data);
    }
}