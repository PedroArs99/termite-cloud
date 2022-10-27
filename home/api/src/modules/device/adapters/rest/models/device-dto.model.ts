import { Device } from "src/modules/device/models/Device.model";
import { DeviceStateDto } from "./device-state-dto.model";

export class DeviceDto {
    friendlyName: string;
    state: DeviceStateDto;

    constructor(friendlyName: string, state: DeviceStateDto){
        this.friendlyName = friendlyName;
        this.state = state;
    }

    static fromDomain(device: Device): DeviceDto {
        return new DeviceDto(
            device.friendlyName,
            DeviceStateDto.fromDomain(device.state)
        )
    }
}