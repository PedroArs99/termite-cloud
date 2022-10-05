import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { SaveHomeStateCommand } from '../../application/commands/saveState/saveHomeState.command';
import { HomeStateCacheKeys } from '../../domain/HomeState.model';
import { DeviceMessage, messageToDevice } from './models/Device.message.model';
import { RegisterDevicesCommand } from '../../application/commands/registerDevices/registerDevices.command';
import { DeviceState } from '../../domain/device/DeviceState.model';
import { UpdateDeviceStateCommand } from '../../application/commands/updateDeviceState/UpdateDeviceState.command';
import { messageToDeviceState } from './models/DeviceState.message.model';

@Controller({})
export class HomeStateMqttController {
  logger = new Logger(HomeStateMqttController.name);

  constructor(private commandBus: CommandBus) {}

  @MessagePattern('zigbee2mqtt/+')
  updateDeviceState(@Ctx() mqttContext: MqttContext, @Payload() deviceState: DeviceState){
    let friendly_name = mqttContext.getTopic().split("/")[1]
    this.logger.log(`Received ${friendly_name} update: ${JSON.stringify(deviceState)}`)

    let command = new UpdateDeviceStateCommand(friendly_name, messageToDeviceState(deviceState));
    this.commandBus.execute(command);
  }

  @MessagePattern('zigbee2mqtt/bridge/devices')
  retainZigbee2MqttDevices(@Payload() devices: Array<DeviceMessage>){
    this.logger.debug(`Registered Devices: ${JSON.stringify(devices, null,2)}`);
    
    const command = new RegisterDevicesCommand(devices.map(message => messageToDevice(message)))
    this.commandBus.execute(command);
  }

  @MessagePattern('zigbee2mqtt/bridge/info')
  retainZigbee2MqttBridgeInfo(@Payload() info: any): void {
    let command = new SaveHomeStateCommand(HomeStateCacheKeys.bridgeLogLevel, info["log_level"]);
    this.commandBus.execute(command);

    command = new SaveHomeStateCommand(HomeStateCacheKeys.bridgePermitJoin, info["permit_join"]);
    this.commandBus.execute(command);
    
    command = new SaveHomeStateCommand(HomeStateCacheKeys.bridgePermitJoinTimeout, info["permit_join_timeout"]);
    this.commandBus.execute(command);
    
    command = new SaveHomeStateCommand(HomeStateCacheKeys.bridgeRestartRequired, info["restart_required"]);
    this.commandBus.execute(command);
  }

  @MessagePattern('zigbee2mqtt/bridge/state')
  retainZigbee2MqttBridgeState(@Payload() state: any): void {
    const stateValue = state["state"];

    this.logger.log(`zigbee2mqtt/bridge/state: ${stateValue}`);
    const command = new SaveHomeStateCommand(HomeStateCacheKeys.bridgeState, stateValue);
    this.commandBus.execute(command);
  }
}
