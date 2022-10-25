import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { RegisterDevicesCommand } from '../../application/commands/register/register-devices.command';
import { DeviceDto } from './models/device-dto.model';
import { DeviceStateDto } from './models/device-state-dto.model';

@Controller()
export class HomeDevicesMqttController {
    private readonly logger = new Logger(HomeDevicesMqttController.name)

    constructor(private commandBus: CommandBus){}

    @MessagePattern('zigbee2mqtt/bridge/devices')
    updateDeviceList(@Payload() devices: Array<DeviceDto>) {
      const friendlyNames = devices.map(device => device.friendly_name)

      this.logger.log(`Devices connected to the bridge: ${friendlyNames.toString()}`)
      
      const command = new RegisterDevicesCommand(friendlyNames);

      this.commandBus.execute(command);
    }

    @MessagePattern('zigbee2mqtt/+')
    updateDeviceState(@Ctx() metadata: MqttContext,  @Payload() state: DeviceStateDto) {
      const device = metadata.getTopic().replace("zigbee2mqtt/", "")
      
      
    }
}