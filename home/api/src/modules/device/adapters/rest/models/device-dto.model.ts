import { Device } from "src/modules/device/models/Device.model";

export class DeviceDto {
    friendlyName: string;

    constructor(friendlyName: string){
        this.friendlyName = friendlyName;
    }

    static fromDomain(device: Device): DeviceDto {
        return new DeviceDto(
            device.friendlyName,
        )
    }
}