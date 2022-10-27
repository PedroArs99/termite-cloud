import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { RegisterDevicesCommand } from '../../application/commands/register/register-devices.command';
import { UpdateDeviceStateCommand } from '../../application/commands/updateState/updateState.command';
import { DeviceDto } from './models/device-dto.model';
import {
  DeviceStateDto,
  deviceStateToDomain,
} from './models/device-state-dto.model';

@Controller()
export class HomeDevicesMqttController {
  private readonly logger = new Logger(HomeDevicesMqttController.name);

  constructor(private commandBus: CommandBus) {}

  @MessagePattern('zigbee2mqtt/bridge/devices')
  updateDeviceList(@Payload() devices: Array<DeviceDto>) {
    let friendlyNames = devices.map((device) => device.friendly_name);
    
    // Exclude coordinator
    friendlyNames = friendlyNames.filter(name => name !== "Coordinator")

    const command = new RegisterDevicesCommand(friendlyNames);

    this.commandBus.execute(command);
  }

  @MessagePattern('zigbee2mqtt/+')
  updateDeviceState(
    @Ctx() metadata: MqttContext,
    @Payload() state: DeviceStateDto,
  ) {
    const friendlyName = metadata.getTopic().replace('zigbee2mqtt/', '');

    const command = new UpdateDeviceStateCommand(
      friendlyName,
      deviceStateToDomain(state),
      false
    );
    this.commandBus.execute(command);
  }
}
