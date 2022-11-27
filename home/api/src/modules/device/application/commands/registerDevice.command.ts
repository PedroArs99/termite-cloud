import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Device } from '../../models/Device.model';
import { DeviceRepository } from '../ports/Device.repository';
import { DeviceService } from '../ports/Device.service';

export class RegisterDeviceCommand {
  constructor(
    readonly friendlyName: string,
    readonly features: Map<String, String>,
  ) {}
}

@CommandHandler(RegisterDeviceCommand)
export class RegisterDevicesHandler
  implements ICommandHandler<RegisterDeviceCommand, Device>
{
  private logger = new Logger(RegisterDevicesHandler.name);

  constructor(
    @Inject('DeviceRepository') private deviceRepo: DeviceRepository,
    @Inject('DeviceService') private deviceService: DeviceService,
  ) {}

  async execute(command: RegisterDeviceCommand): Promise<Device> {
    this.logger.log(`Registering Device on runtime: ${command.friendlyName}`);

    let device = new Device(command.friendlyName, command.features);

    this.deviceRepo.upsert(device);
    this.deviceService.refreshState(device.friendlyName);

    return device;
  }
}
