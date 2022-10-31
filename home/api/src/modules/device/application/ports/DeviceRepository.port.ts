import { Device } from "../../models/Device.model";

export interface DeviceRepository {
    findAll(): Promise<Array<Device>>
    findByFriendlyName(friendlyName: string): Device | undefined
    upsert(device: Device): void
    upsertAll(devices: Array<Device>): void
}