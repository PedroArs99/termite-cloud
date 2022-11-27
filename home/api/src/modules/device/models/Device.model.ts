import { DomainObject } from 'src/modules/common/DomainObject.model';

export class Device extends DomainObject {
  constructor(
    readonly friendlyName: string,
    readonly features: Map<String, String>,
    readonly state?: Map<String, any>,
  ) {
    super();
  }

  updateDeviceState(state: Map<String, any>): Device {
    return new Device(this.friendlyName, this.features, state);
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
