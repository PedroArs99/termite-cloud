import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { RegisterDeviceCommand } from '../../application/commands/registerDevice.command';
import { UpdateDeviceStateCommand } from '../../application/commands/updateState.command';
import { DeviceDto, normalizeDefinition } from './models/device-dto.model';

@Controller()
export class HomeDevicesMqttController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern('zigbee2mqtt/bridge/devices')
  updateDeviceList(@Payload() devices: Array<DeviceDto>) {
    devices
      .filter((device) => !!device.definition)
      .forEach((device) => {
        const friendly_name = device.friendly_name;
        const features = normalizeDefinition(device.definition);

        const command = new RegisterDeviceCommand(friendly_name, features);
        this.commandBus.execute(command);
      });
  }

  @MessagePattern('zigbee2mqtt/+')
  updateDeviceState(
    @Ctx() metadata: MqttContext,
    @Payload() state: any,
  ) {
    const friendlyName = metadata.getTopic().replace('zigbee2mqtt/', '');

    const command = new UpdateDeviceStateCommand(friendlyName, state);
    this.commandBus.execute(command);
  }
}
