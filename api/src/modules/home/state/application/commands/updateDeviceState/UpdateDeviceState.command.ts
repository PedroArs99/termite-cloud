import { DeviceState } from "../../../domain/device/DeviceState.model";

export class UpdateDeviceStateCommand {
    constructor(public readonly friendly_name: string, public readonly state: DeviceState ){} 
}