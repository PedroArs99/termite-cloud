import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Device } from '../../models/Device.model';
import { UpsertDevicesCommand } from './upsert-devices.command';

@CommandHandler(UpsertDevicesCommand)
export class UpsertDevicesHandler
  implements ICommandHandler<UpsertDevicesCommand, Array<Device>>
{
  async execute(command: UpsertDevicesCommand): Promise<Array<Device>> {
    const devices = command.friendlyNames.map((friendlyName) =>
      Device.create(friendlyName),
    );

    return devices;
  }
}
