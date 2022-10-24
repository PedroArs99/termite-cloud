import { Device } from "../../models/Device.model";

export interface DeviceRepository {
    findAll(): Array<Device>
    upsertAll(devices: Array<Device>): void
}