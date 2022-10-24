import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Device } from '../../models/Device.model';
import { DeviceRepository } from '../ports/DeviceRepository.port';
import { UpsertDevicesCommand } from './upsert-devices.command';

@CommandHandler(UpsertDevicesCommand)
export class UpsertDevicesHandler
  implements ICommandHandler<UpsertDevicesCommand, Array<Device>>
{
  constructor(@Inject("DeviceRepository") private deviceRepo: DeviceRepository){}

  async execute(command: UpsertDevicesCommand): Promise<Array<Device>> {
    const devices = command.friendlyNames.map((friendlyName) =>
      Device.create(friendlyName),
    );

    this.deviceRepo.upsertAll(devices);

    return devices;
  }
}
