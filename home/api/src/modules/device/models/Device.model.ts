import { DomainObject } from 'src/modules/common/DomainObject.model';
import { DeviceUpdatedEvent } from './DeviceUpdated.event';

export class Device extends DomainObject {
  constructor(
    readonly friendlyName: string,
    readonly features: Map<String, String>,
    readonly state?: Map<String, any>,
  ) {
    super();
  }

  updateDeviceState(state: Map<String, any>): Device {
    const copy = new Device(this.friendlyName, this.features, state);
    copy.addEvent(new DeviceUpdatedEvent(copy));

    return copy
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
