import { Event } from 'src/modules/common/Event.model';
import { Device } from './Device.model';

export class DeviceUpdatedEvent extends Event {
  constructor(readonly payload: Device) {
    super(DeviceUpdatedEvent.name, payload);
  }
}
