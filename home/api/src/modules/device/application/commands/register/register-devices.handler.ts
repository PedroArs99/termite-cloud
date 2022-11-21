import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeviceState } from '../../../models/Device-State.model';
import { Device } from '../../../models/Device.model';
import { DeviceRepository } from '../../ports/DeviceRepository.port';
import { DeviceService } from '../../ports/DeviceService.port';
import { RegisterDevicesCommand } from './register-devices.command';

@CommandHandler(RegisterDevicesCommand)
export class RegisterDevicesHandler
  implements ICommandHandler<RegisterDevicesCommand, Array<Device>>
{
  private logger = new Logger(RegisterDevicesHandler.name);

  constructor(
    @Inject('DeviceRepository') private deviceRepo: DeviceRepository,
    @Inject('DeviceService') private deviceService: DeviceService,
  ) {}

  async execute(command: RegisterDevicesCommand): Promise<Array<Device>> {
    const undefinedState = DeviceState.create('OFF', 0, '#EFC070', 'color_temp', 370);

    const devices = command.friendlyNames.map((friendlyName) =>
      Device.create(friendlyName, undefinedState),
    );

    devices.forEach((device) => {
      this.logger.log(`Device Registered on Startup: ${device.friendlyName}`);
      this.deviceService.refreshState(device.friendlyName);
    });

    this.deviceRepo.upsertAll(devices);

    return devices;
  }
}
