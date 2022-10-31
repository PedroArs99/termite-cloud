import { Device } from "../../models/Device.model";

export interface DeviceRepository {
    findAll(): Promise<Array<Device>>
    findByFriendlyName(friendlyName: string): Promise<Device | undefined>
    upsert(device: Device): Promise<void>
    upsertAll(devices: Array<Device>): Promise<void>
}