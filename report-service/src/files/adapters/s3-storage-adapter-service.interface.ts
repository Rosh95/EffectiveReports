export interface IS3StorageAdapterService {

    saveReport(originalName: string, buffer: Buffer): Promise<{ url: string }>;
}
