import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SetBridgeStateCommand } from '../../application/commands/setBridgeState/SetBridgeState.command';

@Controller()
export class HomeConfigMqttController {
    private readonly logger = new Logger(HomeConfigMqttController.name)

    constructor(private commandBus: CommandBus){}

    @MessagePattern('zigbee2mqtt/bridge/state')
    setBridgeState(@Payload() { state }: any) {
      this.logger.log(`Bridge State received: ${JSON.stringify(state)}`)

      if(state !== "online" && state !== "offline") {
        throw new TypeError(`"${state} cannot be mapped to bridgeState`)
      }

      let command = new SetBridgeStateCommand(state)
      this.commandBus.execute(command)
    }
}