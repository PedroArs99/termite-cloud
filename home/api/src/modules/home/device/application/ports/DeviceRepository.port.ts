import { Device } from "../../models/Device.model";

export interface DeviceRepository {
    upsertAll(devices: Array<Device>): void
}