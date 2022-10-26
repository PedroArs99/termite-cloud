import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from 'src/modules/common/Event.model';
import { DeviceRepository } from '../../application/ports/DeviceRepository.port';
import { Device } from '../../models/Device.model';

@Injectable()
export class InMemoryDeviceRepository implements DeviceRepository {
  private devices: Array<Device> = new Array();

  constructor(private eventEmitter: EventEmitter2) {}

  findAll(): Array<Device> {
    return this.devices;
  }

  findByFriendlyName(friendlyName: string): Device | undefined {
    return this.devices.find((device) => device.friendlyName === friendlyName);
  }

  upsert(device: Device): void {
    const index = this.devices.findIndex(
      (d) => d.friendlyName === device.friendlyName,
    );

    if (index >= 0) {
      this.devices.splice(index, 1);
    }

    this.devices = [...this.devices, device];
    this.triggerEvents(device);
  }

  upsertAll(devices: Device[]): void {
    this.devices = devices;
    this.triggerEvents(this.devices)
  }

  private triggerEvents(device: Device): void;
  private triggerEvents(devices: Array<Device>): void;
  private triggerEvents(devices: Device | Array<Device>): void {
    if (!Array.isArray(devices)) devices = [devices];

    devices
      .map((device) => device.getEvents())
      .flat()
      .reduce((acc, event) => (acc.includes(event) ? acc : [...acc, event]), [])
      .forEach((event: Event) => this.eventEmitter.emit(event.eventName, event));
  }
}
