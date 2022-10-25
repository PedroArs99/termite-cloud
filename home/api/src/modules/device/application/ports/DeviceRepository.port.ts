import { Device } from "../../models/Device.model";

export interface DeviceRepository {
    findAll(): Array<Device>
    findByFriendlyName(friendlyName: string): Device
    upsert(device: Device): void
    upsertAll(devices: Array<Device>): void
}