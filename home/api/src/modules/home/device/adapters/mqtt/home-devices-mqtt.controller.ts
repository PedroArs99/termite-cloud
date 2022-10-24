import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpsertDevicesCommand } from '../../application/commands/upsert-devices.command';
import { DeviceDto } from './models/device-dto.model';

@Controller()
export class HomeDevicesMqttController {
    private readonly logger = new Logger(HomeDevicesMqttController.name)

    constructor(private commandBus: CommandBus){}

    @MessagePattern('zigbee2mqtt/bridge/devices')
    updateDeviceList(@Payload() devices: Array<DeviceDto>) {
      const friendlyNames = devices.map(device => device.friendly_name)

      this.logger.log(`Devices connected to the bridge: ${friendlyNames.toString()}`)
      
      const command = new UpsertDevicesCommand(friendlyNames);

      this.commandBus.execute(command);
    }
}