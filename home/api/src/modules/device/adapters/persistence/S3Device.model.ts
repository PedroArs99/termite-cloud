import { DeviceState } from "../../models/Device-State.model";

export class S3Device {
    constructor(readonly friendlyName: string, readonly state: DeviceState){}

    toString(): string {
        return JSON.stringify(this);
    }
}