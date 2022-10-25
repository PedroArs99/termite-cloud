import { DomainObject } from "src/modules/common/DomainObject.model";
import { DeviceState } from "./Device-State.model";
import { DeviceEvent } from "./Device.event";

export class Device extends DomainObject {
    private constructor(
      readonly friendlyName: string,
      readonly state: DeviceState
    ) {
      super()
    }

    updateState(newState: DeviceState): Device {
      const device = new Device(this.friendlyName, newState);
      device.addEvent(new DeviceEvent(device.friendlyName))

      return device
    }

    toString(): string {
      return JSON.stringify(this);
    }
  
    static create(friendlyName: string, state: DeviceState): Device {
      const device = new Device(friendlyName, state);
      device.addEvent(new DeviceEvent(friendlyName))

      return device
    }
  }
  