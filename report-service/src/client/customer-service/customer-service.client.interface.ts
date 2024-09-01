export interface ICustomerServiceClient {

    getData<T>(url: string, limit: number, offset: number): Promise<T>;
}
