import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Device } from '../../../models/Device.model';
import { DeviceRepository } from '../../ports/Device.repository';
import { DeviceService } from '../../ports/Device.service';
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
    return []
  }
}
