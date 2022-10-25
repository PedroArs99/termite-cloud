import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeviceState } from '../../models/Device-State.model';
import { Device } from '../../models/Device.model';
import { DeviceRepository } from '../ports/DeviceRepository.port';
import { UpsertDevicesCommand } from './upsert-devices.command';

@CommandHandler(UpsertDevicesCommand)
export class UpsertDevicesHandler
  implements ICommandHandler<UpsertDevicesCommand, Array<Device>>
{
  constructor(@Inject("DeviceRepository") private deviceRepo: DeviceRepository){}

  async execute(command: UpsertDevicesCommand): Promise<Array<Device>> {
    const undefinedState = DeviceState.create("OFF");

    const devices = command.friendlyNames.map((friendlyName) =>
      Device.create(friendlyName, undefinedState),
    );

    this.deviceRepo.upsertAll(devices);

    return devices;
  }
}
