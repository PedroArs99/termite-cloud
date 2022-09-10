import { Device } from "../../../domain/device/Device.model";

export class RegisterDevicesCommand{
    constructor(public readonly devices: Device[]){} 
}