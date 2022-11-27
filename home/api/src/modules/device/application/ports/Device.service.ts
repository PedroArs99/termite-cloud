import { Device } from "../../models/Device.model"

export interface DeviceService {
    refreshState(friendlyName: string): void
    publishDeviceState(device: Device): void
}