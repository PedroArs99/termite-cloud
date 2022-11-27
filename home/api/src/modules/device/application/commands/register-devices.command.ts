import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Device } from '../../models/Device.model';
import { DeviceRepository } from '../ports/Device.repository';

export class RegisterDeviceCommand {
  constructor(readonly friendlyName: string) {}
}

@CommandHandler(RegisterDeviceCommand)
export class RegisterDevicesHandler
  implements ICommandHandler<RegisterDeviceCommand, Device>
{
  private logger = new Logger(RegisterDevicesHandler.name);

  constructor(
    @Inject('DeviceRepository') private deviceRepo: DeviceRepository,
  ) {}

  async execute(command: RegisterDeviceCommand): Promise<Device> {
    this.logger.log(`Registering Device on runtime: ${command.friendlyName}`);

    let device = new Device(command.friendlyName);

    this.deviceRepo.upsert(device);

    return device;
  }
}
