import { DeviceState } from "src/modules/device/models/Device-State.model";

export class UpdateDeviceStateCommand {
    constructor(readonly friendlyName: string, readonly deviceState: DeviceState){}
}
