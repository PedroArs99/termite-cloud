import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Device } from 'src/modules/device/models/Device.model';
import { DeviceUpdatedEvent } from '../../models/DeviceUpdated.event';
import { DeviceRepository } from '../ports/Device.repository';
import { DeviceService } from '../ports/Device.service';

export class UpdateDeviceStateCommand {
  constructor(
    readonly friendlyName: string,
    readonly state: Map<String, any>,
    readonly stateIsDirty: boolean = true,
  ) {}
}

@CommandHandler(UpdateDeviceStateCommand)
export class UpdateDeviceStateHandler
  implements ICommandHandler<UpdateDeviceStateCommand, Device>
{
  private logger = new Logger(UpdateDeviceStateHandler.name);

  constructor(
    @Inject('DeviceRepository') private deviceRepo: DeviceRepository,
    @Inject('DeviceService') private deviceService: DeviceService,
  ) {}

  async execute(command: UpdateDeviceStateCommand): Promise<Device> {
    this.logger.log(`Updating state for device: ${command.friendlyName}`);

    let device = await this.deviceRepo.findByFriendlyName(command.friendlyName);
    device = device.updateDeviceState(command.state);

    if (command.stateIsDirty) {
      device.addEvent(new DeviceUpdatedEvent(device));
    } else {
      this.deviceService.pushDeviceChange(device);
    }

    this.deviceRepo.upsert(device);

    return device;
  }
}
