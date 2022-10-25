import { DeviceState } from "./Device-State.model";

export class Device {
    private constructor(
      readonly friendlyName: string,
      readonly state: DeviceState
    ) {}

    updateState(newState: DeviceState): Device {
      return new Device(this.friendlyName, newState)
    }
  
    static create(friendlyName: string, state: DeviceState): Device{
      return new Device(friendlyName, state);
    }
  }
  