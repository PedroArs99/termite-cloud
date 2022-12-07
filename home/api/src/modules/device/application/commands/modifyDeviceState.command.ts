import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeviceService } from '../ports/Device.service';

export class ModifyDeviceStateCommand {
  constructor(
    readonly friendlyName: string,
    readonly state: Map<string, any>,
  ) {}
}

@CommandHandler(ModifyDeviceStateCommand)
export class ModifyDeviceStateHandler
  implements ICommandHandler<ModifyDeviceStateCommand, void>
{
  private logger = new Logger(ModifyDeviceStateHandler.name);

  constructor(@Inject('DeviceService') private deviceService: DeviceService) {}

  async execute(command: ModifyDeviceStateCommand) {
    this.logger.log(`Updating state for device: ${command.friendlyName}`);

    this.deviceService.updateDeviceState(command.friendlyName, command.state);
  }
}
