import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { SaveHomeStateCommand } from '../application/commands/save/saveHomeState.command';

@Controller({})
export class HomeStateMqttController {
  logger = new Logger(HomeStateMqttController.name);

  constructor(private commandBus: CommandBus) {}

  @MessagePattern('zigbee2mqtt/bridge/state')
  retainZigbee2MqttBridgeState(@Payload() state: any): void {
    const stateValue = state["state"];

    this.logger.log(`zigbee2mqtt/bridge/state: ${stateValue}`);
    const command = new SaveHomeStateCommand('bridge/state', stateValue);
    this.commandBus.execute(command);
  }
}
