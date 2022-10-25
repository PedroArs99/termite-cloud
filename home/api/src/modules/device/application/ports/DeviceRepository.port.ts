import { Device } from "../../models/Device.model";

export interface DeviceRepository {
    findAll(): Array<Device>
    findByFriendlyName(friendlyName: string): Device
    upsertAll(devices: Array<Device>): void
}