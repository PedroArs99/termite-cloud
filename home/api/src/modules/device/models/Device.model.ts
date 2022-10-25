import { DeviceState } from "./Device-State.model";

export class Device {
    private constructor(
      readonly friendlyName: string,
      readonly deviceState: DeviceState
    ) {}
  
    static create(friendlyName: string, deviceState: DeviceState): Device{
      return new Device(friendlyName, deviceState);
    }
  }
  